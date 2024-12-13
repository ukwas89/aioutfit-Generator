import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import Footer from "@/components/Footer";

const ContactUs = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thank you for contacting us!",
      description: "We will get back to you soon.",
    });
    setFormData({ name: "", email: "", reason: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary">
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="mb-6"
            >
              ← Back to Home
            </Button>
            <h1 className="text-4xl font-bold text-center mb-4">Contact Us</h1>
            <p className="text-center text-muted-foreground">
              Have a question or feedback? We'd love to hear from you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="reason" className="block text-sm font-medium mb-2">
                Reason for Contact
              </label>
              <Textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
                placeholder="Please tell us how we can help you"
                className="min-h-[120px]"
              />
            </div>

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;