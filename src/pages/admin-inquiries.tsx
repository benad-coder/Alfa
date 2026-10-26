import { useListInquiries } from "@workspace/api-client-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AdminInquiries() {
  const { data: inquiries, isLoading } = useListInquiries();

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="mb-12">
        <h1 className="font-serif text-3xl md:text-4xl mb-4">Inquiries Management</h1>
        <p className="text-muted-foreground font-light">Admin view for all customer contact inquiries.</p>
      </div>

      <div className="bg-secondary/10 border border-border overflow-hidden">
        {isLoading ? (
          <div className="p-8 space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-secondary/30">
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="font-medium text-xs uppercase tracking-widest">Date</TableHead>
                  <TableHead className="font-medium text-xs uppercase tracking-widest">Name</TableHead>
                  <TableHead className="font-medium text-xs uppercase tracking-widest">Contact Info</TableHead>
                  <TableHead className="font-medium text-xs uppercase tracking-widest">Subject</TableHead>
                  <TableHead className="font-medium text-xs uppercase tracking-widest w-[40%]">Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inquiries?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                      No inquiries found.
                    </TableCell>
                  </TableRow>
                ) : (
                  inquiries?.map((inquiry) => (
                    <TableRow key={inquiry.id} className="border-border hover:bg-secondary/20 transition-colors">
                      <TableCell className="text-sm whitespace-nowrap text-muted-foreground align-top pt-4">
                        {format(new Date(inquiry.createdAt), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell className="font-medium align-top pt-4">{inquiry.name}</TableCell>
                      <TableCell className="text-sm align-top pt-4">
                        <div className="flex flex-col gap-1">
                          <a href={`mailto:${inquiry.email}`} className="text-primary hover:underline">{inquiry.email}</a>
                          {inquiry.phone && <span className="text-muted-foreground">{inquiry.phone}</span>}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm align-top pt-4">{inquiry.subject || "-"}</TableCell>
                      <TableCell className="text-sm text-muted-foreground align-top pt-4 max-w-md">
                        <div className="bg-background/50 p-4 border border-border/50 font-light leading-relaxed whitespace-pre-wrap">
                          {inquiry.message}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
