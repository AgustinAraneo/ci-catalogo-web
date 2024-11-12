import { faqs } from "../src/data/data.faq";

const FAQPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Preguntas Frecuentes
      </h1>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="p-6 bg-pink-100 rounded-lg shadow-md transition duration-300 hover:bg-pink-200"
          >
            <h2 className="text-xl font-semibold mb-2">{faq.title}</h2>
            <div>{faq.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
