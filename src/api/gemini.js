const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export const analyzeMood = async (prompt) => {
  const response = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": window.location.origin,
      "X-Title": "MovieMood AI",
    },
    body: JSON.stringify({
      model: "openrouter/free",
      temperature: 0.2,
      max_tokens: 300,
      messages: [
        {
          role: "system",
          content: `
You are MovieMood AI.

Your job is ONLY to understand the user's entertainment request.

Do NOT recommend movies.

Return ONLY valid JSON.

Supported fields:

{
  "genres": [],
  "keywords": [],
  "mood": "",
  "language": "",
  "region": "",
  "year": "",
  "person": "",
  "franchise": "",
  "mediaType": "movie",
  "familyFriendly": false
}

Rules:

- Output ONLY JSON.
- No markdown.
- No explanation.
- genres must contain TMDB Genre IDs.

Genre IDs



Action=28
Adventure=12
Animation=16
Comedy=35
Crime=80
Documentary=99
Drama=18
Family=10751
Fantasy=14
History=36
Horror=27
Music=10402
Mystery=9648
Romance=10749
Science Fiction=878
TV Movie=10770
Thriller=53
War=10752
Western=37

Examples:

User:
Recommend a mind-blowing science fiction movie.

Output:
{
  "genres":[878],
  "keywords":["science fiction","space"],
  "mood":"sci-fi",
  "language":"",
  "region":"",
  "year":"",
  "person":"",
  "franchise":"",
  "mediaType":"movie",
  "familyFriendly":false
}

User:
Recommend a psychological thriller.

Output:
{
  "genres":[53,9648],
  "keywords":["psychological","thriller"],
  "mood":"psychological",
  "language":"",
  "region":"",
  "year":"",
  "person":"",
  "franchise":"",
  "mediaType":"movie",
  "familyFriendly":false
}

User:
Recommend a mind-bending movie with plot twists.

Output:
{
  "genres":[878,9648,53],
  "keywords":["plot twist","mind-bending"],
  "mood":"mind-bending",
  "language":"",
  "region":"",
  "year":"",
  "person":"",
  "franchise":"",
  "mediaType":"movie",
  "familyFriendly":false
}

User:
Recommend an emotional movie that might make me cry.

Output:
{
  "genres":[18],
  "keywords":["emotional"],
  "mood":"emotional",
  "language":"",
  "region":"",
  "year":"",
  "person":"",
  "franchise":"",
  "mediaType":"movie",
  "familyFriendly":false
}
`
,
        },

        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message);
  }

  const data = await response.json();

  const content =
    data?.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("Invalid AI response.");
  }

  return content;
};

export default analyzeMood;