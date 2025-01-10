"use client";

import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ChevronRight, ChevronLeft, Users, Plane } from "lucide-react";
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
  const absentCount = watch("absentCount");

  const onSubmit = (data: ThirdFormData) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-4 space-y-8">
      {/* Absent Members Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Users className="h-6 w-6 text-blue-500" />
            <div>
              <CardTitle className="text-xl">Absent Household Members</CardTitle>
              <p className="text-sm text-gray-500">Record details of household members absent on census night</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
              <Label htmlFor="absentCount" className="text-sm font-medium">
                Number of usual household members absent on census night:
              </Label>
              <Input
                id="absentCount"
                {...register("absentCount", { required: true })}
                className="w-20 text-center"
                placeholder="0"
              />
            </div>

            {absentCount && parseInt(absentCount) > 0 && (
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-100">
                      <TableHead className="text-xs font-semibold">LINE NO.</TableHead>
                      <TableHead className="text-xs font-semibold">FULL NAME</TableHead>
                      <TableHead className="text-xs font-semibold">RELATIONSHIP</TableHead>
                      <TableHead className="text-xs font-semibold">CODE</TableHead>
                      <TableHead className="text-xs font-semibold">SEX</TableHead>
                      <TableHead className="text-xs font-semibold">AGE</TableHead>
                      <TableHead className="text-xs font-semibold">DESTINATION</TableHead>
                      <TableHead className="text-xs font-semibold">REGION CODE</TableHead>
                      <TableHead className="text-xs font-semibold">MONTHS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array(parseInt(absentCount) || 6).fill(null).map((_, index) => (
                      <TableRow key={index} className="hover:bg-gray-50">
                        <TableCell className="text-center font-medium">{`0${index + 1}`}</TableCell>
                        <TableCell>
                          <Input {...register(`absentMembers.${index}.fullName`)} className="w-full" />
                        </TableCell>
                        <TableCell>
                          <Input {...register(`absentMembers.${index}.relationshipToHead`)} className="w-full" />
                        </TableCell>
                        <TableCell>
                          <Input {...register(`absentMembers.${index}.code`)} className="w-16 text-center" />
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
                          <Input {...register(`absentMembers.${index}.age`)} className="w-16 text-center" />
                        </TableCell>
                        <TableCell>
                          <Input {...register(`absentMembers.${index}.destination`)} className="w-full" />
                        </TableCell>
                        <TableCell>
                          <Input {...register(`absentMembers.${index}.regionCode`)} className="w-16 text-center" />
                        </TableCell>
                        <TableCell>
                          <Input {...register(`absentMembers.${index}.monthsAbsent`)} className="w-16 text-center" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Emigration Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Plane className="h-6 w-6 text-blue-500" />
            <div>
              <CardTitle className="text-xl">Emigration Outside the Country</CardTitle>
              <p className="text-sm text-gray-500">Record details of household members living outside Ghana</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <Label className="block text-sm font-medium">
                Has any former member of this household been living continuously for 6 months or more outside Ghana?
              </Label>
              <RadioGroup
                defaultValue={initialData.hasEmigrants}
                onValueChange={(value) => {
                  register("hasEmigrants").onChange({
                    target: { value }
                  });
                }}
                className="flex space-x-4"
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

            {hasEmigrants === "Yes" && (
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-100">
                      <TableHead className="text-xs font-semibold">LINE NO.</TableHead>
                      <TableHead className="text-xs font-semibold">FULL NAME</TableHead>
                      <TableHead className="text-xs font-semibold">RELATIONSHIP</TableHead>
                      <TableHead className="text-xs font-semibold">CODE</TableHead>
                      <TableHead className="text-xs font-semibold">SEX</TableHead>
                      <TableHead className="text-xs font-semibold">AGE</TableHead>
                      <TableHead className="text-xs font-semibold">COUNTRY</TableHead>
                      <TableHead className="text-xs font-semibold">CODE</TableHead>
                      <TableHead className="text-xs font-semibold">YEAR</TableHead>
                      <TableHead className="text-xs font-semibold">ACTIVITY</TableHead>
                      <TableHead className="text-xs font-semibold">OTHER</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array(6).fill(null).map((_, index) => (
                      <TableRow key={index} className="hover:bg-gray-50">
                        <TableCell className="text-center font-medium">{`0${index + 1}`}</TableCell>
                        <TableCell>
                          <Input {...register(`emigrants.${index}.fullName`)} className="w-full" />
                        </TableCell>
                        <TableCell>
                          <Input {...register(`emigrants.${index}.relationshipToHead`)} className="w-full" />
                        </TableCell>
                        <TableCell>
                          <Input {...register(`emigrants.${index}.code`)} className="w-16 text-center" />
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
                          <Input {...register(`emigrants.${index}.age`)} className="w-16 text-center" />
                        </TableCell>
                        <TableCell>
                          <Input {...register(`emigrants.${index}.countryName`)} className="w-full" />
                        </TableCell>
                        <TableCell>
                          <Input {...register(`emigrants.${index}.countryCode`)} className="w-16 text-center" />
                        </TableCell>
                        <TableCell>
                          <Input {...register(`emigrants.${index}.yearOfDeparture`)} className="w-24 text-center" />
                        </TableCell>
                        <TableCell>
                          <Input {...register(`emigrants.${index}.activityCode`)} className="w-16 text-center" />
                        </TableCell>
                        <TableCell>
                          <Input {...register(`emigrants.${index}.otherActivity`)} className="w-full" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <Button
          type="button"
          onClick={onBack}
          variant="outline"
          disabled={isSubmitting}
          className="flex items-center"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="flex items-center bg-blue-600 hover:bg-blue-700"
        >
          Continue
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </form>
  );
}

export { defaultValues };
export type { ThirdFormData };