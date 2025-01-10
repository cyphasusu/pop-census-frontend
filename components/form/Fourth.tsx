"use client"

import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPlus, ChevronRight, ChevronLeft, Trash2, Users } from "lucide-react";

interface PersonData {
  fullName: string;
  dateOfBirth: {
    day: string;
    month: string;
    year: string;
  };
  age: string;
  nationality: string;
  ethnicity: string;
}

interface FourthFormData {
  people: PersonData[];
}

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
  { value: "16", label: "Oceanian" },
];

export default function FourthForm({ initialData, onNext, onBack }: FourthFormProps) {
  const { register, handleSubmit, control } = useForm<FourthFormData>({
    defaultValues: initialData || defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "people",
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-100">
            <Users className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Household Members</h2>
            <p className="text-sm text-gray-500">Record information for each household member</p>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            if (fields.length < 10) {
              append(defaultValues.people[0]);
            }
          }}
          disabled={fields.length >= 10}
          className="flex items-center gap-2 bg-white"
        >
          <UserPlus className="h-4 w-4" />
          Add Member
        </Button>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <Card key={field.id} className="group relative hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="col-span-2 md:col-span-1">
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                    Full Name
                  </label>
                  <Input
                    {...register(`people.${index}.fullName`)}
                    placeholder="Enter full name"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                    Date of Birth
                  </label>
                  <div className="flex gap-2">
                    <Input
                      {...register(`people.${index}.dateOfBirth.day`)}
                      placeholder="DD"
                      className="w-16 text-center"
                    />
                    <Input
                      {...register(`people.${index}.dateOfBirth.month`)}
                      placeholder="MM"
                      className="w-16 text-center"
                    />
                    <Input
                      {...register(`people.${index}.dateOfBirth.year`)}
                      placeholder="YYYY"
                      className="w-20 text-center"
                    />
                  </div>
                </div>

                <div className="w-24">
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                    Age
                  </label>
                  <Input
                    {...register(`people.${index}.age`)}
                    placeholder="Age"
                    className="text-center"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                    Nationality
                  </label>
                  <Select
                    onValueChange={(value) => {
                      register(`people.${index}.nationality`).onChange({ target: { value } });
                    }}
                    defaultValue={field.nationality}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select nationality" />
                    </SelectTrigger>
                    <SelectContent>
                      {nationalityOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                    Ethnicity
                  </label>
                  <Input
                    {...register(`people.${index}.ethnicity`)}
                    placeholder="Enter ethnicity"
                    className="w-full"
                  />
                </div>
              </div>

              {index > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(index)}
                  className="absolute top-4 right-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </CardContent>
          </Card>
        ))}

        {fields.length >= 10 && (
          <p className="text-sm text-amber-600 flex items-center gap-2">
            Maximum number of members (10) reached
          </p>
        )}
      </div>

      <div className="flex justify-between pt-6">
        {onBack && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
        )}
        <Button 
          type="submit"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
        >
          Continue
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}

export type { FourthFormData };