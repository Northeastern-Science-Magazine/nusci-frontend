export function emailToProfileURL(email: string) {
  return `${process.env.NEXT_PUBLIC_URL}/profile/${email.split("@")[0]}`;
}
