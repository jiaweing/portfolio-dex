const URL_REGEX = /(?:https?:\/\/|www\.)\S+/gi;
const EMOJI_REGEX = /[\p{Extended_Pictographic}\uFE0F]/gu;

interface SpeechTextMapping {
  spokenText: string;
  spokenToOriginal: number[];
}

export function buildSpeechTextMapping(text: string): SpeechTextMapping {
  if (!text) {
    return { spokenText: "", spokenToOriginal: [] };
  }

  const ignored = new Array<boolean>(text.length).fill(false);

  for (const match of text.matchAll(URL_REGEX)) {
    const start = match.index ?? -1;
    if (start < 0) continue;
    const end = start + match[0].length;
    for (let i = start; i < end && i < text.length; i++) {
      ignored[i] = true;
    }
  }

  for (const match of text.matchAll(EMOJI_REGEX)) {
    const start = match.index ?? -1;
    if (start < 0) continue;
    const end = start + match[0].length;
    for (let i = start; i < end && i < text.length; i++) {
      ignored[i] = true;
    }
  }

  let spokenText = "";
  const spokenToOriginal: number[] = [];

  for (let i = 0; i < text.length; i++) {
    if (ignored[i]) continue;
    spokenText += text[i];
    spokenToOriginal.push(i);
  }

  return { spokenText, spokenToOriginal };
}

export function toSpeechText(text: string): string {
  return buildSpeechTextMapping(text).spokenText;
}
