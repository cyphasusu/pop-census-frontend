"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Define the schema for a single person's data
const personSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  dateOfBirth: z.object({
    day: z.string().min(1, "Day is required"),
    month: z.string().min(1, "Month is required"),
    year: z.string().min(1, "Year is required"),
  }),
  age: z.string().min(1, "Age is required"),
  nationality: z.string().min(1, "Nationality is required"),
  ethnicity: z.string().min(1, "Ethnicity is required"),
});

// Schema for the entire form with up to 10 people
const formSchema = z.object({
  people: z.array(personSchema).min(1, "At least one person must be added"),
});

export type PersonData = z.infer<typeof personSchema>;
export type FourthFormData = z.infer<typeof formSchema>;

export const defaultValues: FourthFormData = {
  people: [{
    fullName: "",
    dateOfBirth: { day: "", month: "", year: "" },
    age: "",
    nationality: "",
    ethnicity: "",
  }]
};

interface FourthFormProps {
  initialData?: FourthFormData;
  onNext: (data: FourthFormData) => void;
  onBack?: () => void;
}

const nationalityOptions = [
  { value: "11", label: "Other ECOWAS National" },
  { value: "12", label: "African, other than ECOWAS" },
  { value: "13", label: "European" },
  { value: "14", label: "American (North, South/Caribbean)" },
  { value: "15", label: "Asian" },
  { value: "16", label: "Oceanian (Australian and New Zealander)" },
];

export default function FourthForm({ initialData, onNext, onBack }: FourthFormProps) {
  const form = useForm<FourthFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    name: "people",
    rules: { maxLength: 10 },
  });

  const onSubmit = (data: FourthFormData) => {
    onNext(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Full Name</TableHead>
                <TableHead>Date of Birth</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Nationality</TableHead>
                <TableHead>Ethnicity</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((field, index) => (
                <TableRow key={field.id}>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name={`people.${index}.fullName`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} placeholder="Enter full name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <FormField
                        control={form.control}
                        name={`people.${index}.dateOfBirth.day`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} placeholder="DD" className="w-16" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`people.${index}.dateOfBirth.month`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} placeholder="MM" className="w-16" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`people.${index}.dateOfBirth.year`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} placeholder="YYYY" className="w-20" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name={`people.${index}.age`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} placeholder="Age" className="w-16" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name={`people.${index}.nationality`}
                      render={({ field }) => (
                        <FormItem>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select nationality" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {nationalityOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name={`people.${index}.ethnicity`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} placeholder="Enter ethnicity" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => {
            if (fields.length < 10) {
              append({
                fullName: "",
                dateOfBirth: { day: "", month: "", year: "" },
                age: "",
                nationality: "",
                ethnicity: "",
              });
            }
          }}
          disabled={fields.length >= 10}
        >
          Add Person
        </Button>

        <div className="flex justify-between pt-6">
          {onBack && (
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
          )}
          <Button type="submit">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}