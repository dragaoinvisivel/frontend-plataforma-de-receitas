type Props = {};

export default function Footer({}: Props) {
  return (
    <footer className=" py-6">
      <div className="container mx-auto text-center">
        <blockquote className="text-sm italic">
          "Se você deseja fazer uma torta de maçã do zero, você deve, primeiro,
          criar o universo."
          <cite className="block mt-2 font-medium">Carl Sagan</cite>
        </blockquote>
      </div>
    </footer>
  );
}
