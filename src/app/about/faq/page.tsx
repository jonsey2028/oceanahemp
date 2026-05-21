import { redirect } from "next/navigation";

export const metadata = {
  title: "FAQ — OceanaHemp",
  description: "Redirecting to our FAQ page...",
};

export default function AboutFaqRedirect() {
  redirect("/faq");
}
