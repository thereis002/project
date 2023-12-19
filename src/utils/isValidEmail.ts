export const isValidEmail = (email: string) =>
  new RegExp(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(email);
