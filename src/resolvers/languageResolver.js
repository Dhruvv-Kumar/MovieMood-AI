export const resolveLanguage = (text) => {
  text = text.toLowerCase();

  if (
    text.includes("bollywood") ||
    text.includes("hindi")
  ) {
    return {
      language: "hi",
      region: "IN",
    };
  }

  if (text.includes("tamil")) {
    return {
      language: "ta",
      region: "IN",
    };
  }

  if (text.includes("telugu")) {
    return {
      language: "te",
      region: "IN",
    };
  }

  if (text.includes("malayalam")) {
    return {
      language: "ml",
      region: "IN",
    };
  }

  if (text.includes("kannada")) {
    return {
      language: "kn",
      region: "IN",
    };
  }

  if (text.includes("korean")) {
    return {
      language: "ko",
      region: "KR",
    };
  }

  if (text.includes("japanese")) {
    return {
      language: "ja",
      region: "JP",
    };
  }

  if (text.includes("anime")) {
    return {
      language: "ja",
      region: "JP",
    };
  }

  return {
    language: "",
    region: "",
  };
};

export default resolveLanguage;