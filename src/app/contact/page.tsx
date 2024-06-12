import Heading from "@/components/text/Heading";

export default function Contact({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    return (
        <div className="bg-slate-950 min-h-screen min-w-screen flex justify-center items-center">
            <Heading text="Contact page is still under construction. Check back soon to get in touch with me." />
        </div>
    );
  }