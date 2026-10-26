import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSubmitContact } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();
  const submitMutation = useSubmitContact();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = (data: ContactFormValues) => {
    submitMutation.mutate({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        subject: data.subject || null,
        message: data.message
      }
    }, {
      onSuccess: () => {
        toast({
          title: "Inquiry Sent",
          description: "Thank you for reaching out. We will respond shortly."
        });
        form.reset();
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Submission Failed",
          description: "There was an error sending your message. Please try again."
        });
      }
    });
  };

  return (
    <div className="flex flex-col w-full pt-8 pb-12 md:pt-12 md:pb-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-20">
          <p className="text-primary uppercase tracking-[0.3em] text-xs sm:text-sm font-medium mb-4 md:mb-6">Get in Touch</p>
          <h1 className="font-serif text-2xl sm:text-4xl md:text-6xl mb-4 md:mb-8">Contact Us.</h1>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg font-light leading-relaxed">
            For inquiries regarding our collections, bespoke services, or general questions, please reach out to our team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-6xl mx-auto">
          <div>
            <div className="mb-8 md:mb-12">
              <h3 className="font-serif text-xl sm:text-2xl mb-3 md:mb-4">Atelier Information</h3>
              <p className="text-muted-foreground text-sm sm:text-base font-light mb-4 md:mb-8">We welcome clients by appointment to ensure the highest level of personalized service.</p>
              
              <div className="space-y-4 md:space-y-6">
                <div>
                  <p className="text-xs sm:text-sm uppercase tracking-widest text-primary font-medium mb-1 md:mb-2">Email</p>
                  <p className="text-foreground text-sm sm:text-base">inquiries@alfavogue.com</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm uppercase tracking-widest text-primary font-medium mb-1 md:mb-2">Phone</p>
                  <p className="text-foreground">
                    <a href="tel:+233592459953" className="hover:text-primary transition-colors">+233 592 459 953</a><br />
                    <a href="tel:+233536489921" className="hover:text-primary transition-colors">+233 536 489 921</a>
                  </p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm uppercase tracking-widest text-primary font-medium mb-1 md:mb-2">Location</p>
                  <p className="text-foreground text-sm sm:text-base">Accra, Ghana</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm uppercase tracking-widest text-primary font-medium mb-1 md:mb-2">Hours</p>
                  <p className="text-foreground text-sm sm:text-base">Monday - Friday: 9am - 6pm<br />Saturday: 10am - 4pm</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-secondary/20 p-5 sm:p-8 md:p-10 border border-border">
            <h3 className="font-serif text-xl sm:text-2xl mb-5 md:mb-8">Send an Inquiry</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">Name</FormLabel>
                        <FormControl>
                          <Input className="bg-transparent border-t-0 border-x-0 border-b-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary" placeholder="Your Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">Email</FormLabel>
                        <FormControl>
                          <Input type="email" className="bg-transparent border-t-0 border-x-0 border-b-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary" placeholder="Your Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">Phone (Optional)</FormLabel>
                        <FormControl>
                          <Input className="bg-transparent border-t-0 border-x-0 border-b-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary" placeholder="Your Phone" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">Subject (Optional)</FormLabel>
                        <FormControl>
                          <Input className="bg-transparent border-t-0 border-x-0 border-b-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary" placeholder="Inquiry Subject" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          className="bg-transparent border-t-0 border-x-0 border-b-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary min-h-[120px] resize-none" 
                          placeholder="How can we assist you?" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={submitMutation.isPending}
                  className="w-full h-10 sm:h-12 md:h-14 bg-primary text-primary-foreground text-xs sm:text-sm uppercase tracking-widest font-medium rounded-none hover:bg-primary/90 mt-2 md:mt-4"
                >
                  {submitMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Submit Inquiry"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
