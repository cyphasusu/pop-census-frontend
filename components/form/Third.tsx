"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";

interface AbsentMember {
  lineNo: string;
  fullName: string;
  relationshipToHead: string;
  code: string;
  sex: "M" | "F";
  age: string;
  destination: string;
  regionCode: string;
  monthsAbsent: string;
}

interface EmigrantMember {
  lineNo: string;
  fullName: string;
  relationshipToHead: string;
  code: string;
  sex: "M" | "F";
  age: string;
  countryName: string;
  countryCode: string;
  yearOfDeparture: string;
  activityCode: string;
  otherActivity: string;
}

interface ThirdFormData {
  absentCount: string;
  absentMembers: AbsentMember[];
  hasEmigrants: "Yes" | "No";
  emigrants: EmigrantMember[];
}

interface ThirdFormProps {
  initialData?: ThirdFormData;
  onBack: () => void;
  onNext: (data: ThirdFormData) => void;
  isSubmitting?: boolean;
}

const defaultValues: ThirdFormData = {
  absentCount: "",
  absentMembers: Array(6).fill({
    lineNo: "",
    fullName: "",
    relationshipToHead: "",
    code: "",
    sex: "M",
    age: "",
    destination: "",
    regionCode: "",
    monthsAbsent: ""
  }),
  hasEmigrants: "No",
  emigrants: Array(6).fill({
    lineNo: "",
    fullName: "",
    relationshipToHead: "",
    code: "",
    sex: "M",
    age: "",
    countryName: "",
    countryCode: "",
    yearOfDeparture: "",
    activityCode: "",
    otherActivity: ""
  })
};

export default function ThirdForm({
  initialData = defaultValues,
  onBack,
  onNext,
  isSubmitting = false
}: ThirdFormProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ThirdFormData>({
    defaultValues: initialData
  });

  const hasEmigrants = watch("hasEmigrants");

  const onSubmit = (data: ThirdFormData) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Absent Members Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Label htmlFor="absentCount">
            How many of your USUAL household members were absent on census night?
          </Label>
          <Input
            id="absentCount"
            {...register("absentCount", { required: true })}
            className="w-20"
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>LINE NO.</TableHead>
              <TableHead>FULL NAME</TableHead>
              <TableHead>RELATIONSHIP TO HEAD</TableHead>
              <TableHead>CODE</TableHead>
              <TableHead>SEX</TableHead>
              <TableHead>AGE</TableHead>
              <TableHead>DESTINATION Town/Village</TableHead>
              <TableHead>Region/Country CODE</TableHead>
              <TableHead>MONTHS ABSENT</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array(6).fill(null).map((_, index) => (
              <TableRow key={index}>
                <TableCell>{`0${index + 1}`}</TableCell>
                <TableCell>
                  <Input {...register(`absentMembers.${index}.fullName`)} />
                </TableCell>
                <TableCell>
                  <Input {...register(`absentMembers.${index}.relationshipToHead`)} />
                </TableCell>
                <TableCell>
                  <Input {...register(`absentMembers.${index}.code`)} className="w-16" />
                </TableCell>
                <TableCell>
                  <Select
                    onValueChange={(value) => {
                      register(`absentMembers.${index}.sex`).onChange({
                        target: { value }
                      });
                    }}
                    defaultValue="M"
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M">M</SelectItem>
                      <SelectItem value="F">F</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Input {...register(`absentMembers.${index}.age`)} className="w-16" />
                </TableCell>
                <TableCell>
                  <Input {...register(`absentMembers.${index}.destination`)} />
                </TableCell>
                <TableCell>
                  <Input {...register(`absentMembers.${index}.regionCode`)} className="w-16" />
                </TableCell>
                <TableCell>
                  <Input {...register(`absentMembers.${index}.monthsAbsent`)} className="w-16" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Emigration Section */}
      <div className="space-y-4">
        <div className="border-t pt-4">
          <h3 className="font-medium mb-4">
            EMIGRATION OUTSIDE THE COUNTRY
          </h3>
          <div className="space-y-2">
            <Label>
              Has any former member of this household been living continuously for 6 months or more outside Ghana?
            </Label>
            <RadioGroup
              defaultValue={initialData.hasEmigrants}
              onValueChange={(value) => {
                register("hasEmigrants").onChange({
                  target: { value }
                });
              }}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Yes" id="yes" />
                <Label htmlFor="yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="No" id="no" />
                <Label htmlFor="no">No</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {hasEmigrants === "Yes" && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>LINE NO.</TableHead>
                <TableHead>FULL NAME</TableHead>
                <TableHead>RELATIONSHIP TO HEAD</TableHead>
                <TableHead>CODE</TableHead>
                <TableHead>SEX</TableHead>
                <TableHead>AGE</TableHead>
                <TableHead>DESTINATION COUNTRY NAME</TableHead>
                <TableHead>CODE</TableHead>
                <TableHead>YEAR OF DEPARTURE</TableHead>
                <TableHead>ACTIVITY CODE</TableHead>
                <TableHead>OTHER (SPECIFY)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array(6).fill(null).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>{`0${index + 1}`}</TableCell>
                  <TableCell>
                    <Input {...register(`emigrants.${index}.fullName`)} />
                  </TableCell>
                  <TableCell>
                    <Input {...register(`emigrants.${index}.relationshipToHead`)} />
                  </TableCell>
                  <TableCell>
                    <Input {...register(`emigrants.${index}.code`)} className="w-16" />
                  </TableCell>
                  <TableCell>
                    <Select
                      onValueChange={(value) => {
                        register(`emigrants.${index}.sex`).onChange({
                          target: { value }
                        });
                      }}
                      defaultValue="M"
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="M">M</SelectItem>
                        <SelectItem value="F">F</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input {...register(`emigrants.${index}.age`)} className="w-16" />
                  </TableCell>
                  <TableCell>
                    <Input {...register(`emigrants.${index}.countryName`)} />
                  </TableCell>
                  <TableCell>
                    <Input {...register(`emigrants.${index}.countryCode`)} className="w-16" />
                  </TableCell>
                  <TableCell>
                    <Input {...register(`emigrants.${index}.yearOfDeparture`)} className="w-24" />
                  </TableCell>
                  <TableCell>
                    <Input {...register(`emigrants.${index}.activityCode`)} className="w-16" />
                  </TableCell>
                  <TableCell>
                    <Input {...register(`emigrants.${index}.otherActivity`)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <Button
          type="button"
          onClick={onBack}
          variant="outline"
          disabled={isSubmitting}
        >
          Back
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Next
        </Button>
      </div>
    </form>
  );
}

export { defaultValues };
export type { ThirdFormData };