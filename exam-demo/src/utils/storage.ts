export function loadAnswers(examId: string) {
  const raw = localStorage.getItem(examId);
  return raw ? JSON.parse(raw) : {};
}

export function saveAnswers(examId: string, answers: Record<string, string>) {
  localStorage.setItem(examId, JSON.stringify(answers));
}
