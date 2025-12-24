export function syncAnswer() {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.3 ? resolve() : reject();
    }, 500);
  });
}
