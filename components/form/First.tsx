"use client"

import React , {useState} from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import CustomFormField, { FormFieldType } from "../CustomField";

export interface FirstFormData {
  regionName: string;
  districtName: string;
  districtType: string;
  subDistrict: string;
  localityName: string;
  address: string;
  phone1: string;
  phone2?: string;
  enumAreaCode: {
    region: string;
    district: string;
    districtType: string;
    subDistrict: string;
    eaNumber: string;
  };
}

interface FirstFormProps {
  initialData?: Partial<FirstFormData>;
  onBack?: () => void;
  onNext: (data: FirstFormData) => void;
}
const locationFields = [
  { name: "regionName", label: "A01 Region Name", placeholder: "Enter Region Name" },
  { name: "districtName", label: "A02 District Name", placeholder: "Enter District Name" },
  { name: "districtType", label: "A03 District Type", placeholder: "Enter District Type" },
  { name: "subDistrict", label: "A04 Sub-District", placeholder: "Enter Sub-District" },
  { name: "localityName", label: "A05 Locality Name", placeholder: "Enter Locality Name" },
] as const;

export const defaultValues: FirstFormData = {
  regionName: "",
  districtName: "",
  districtType: "",
  subDistrict: "",
  localityName: "",
  address: "",
  phone1: "",
  phone2: "",
  enumAreaCode: {
    region: "",
    district: "",
    districtType: "",
    subDistrict: "",
    eaNumber: ""
  },
};

const FirstForm: React.FC<FirstFormProps> = ({ initialData = {}, onBack, onNext }) => {
  const form = useForm<FirstFormData>({
    defaultValues: {
      ...defaultValues,
      ...initialData
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: FirstFormData) => {
    setIsLoading(true);
    try {
      await onNext(data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form 
        onSubmit={form.handleSubmit(handleSubmit)} 
        className="max-w-5xl mx-auto p-4"
      >
        <Card className="mb-8">
          <CardHeader className="text-center border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-lg font-bold">PHC 1A</div>
                <img 
                  src="/api/placeholder/50/50"
                  alt="Ghana Coat of Arms"
                  className="h-12 w-12"
                />
              </div>
              <div className="text-center flex-1">
                <CardTitle className="text-xl font-bold">REPUBLIC OF GHANA</CardTitle>
                <p className="text-sm text-gray-600">GHANA STATISTICAL SERVICE</p>
                <p className="text-sm font-semibold">(HOUSEHOLD POPULATION)</p>
                <p className="text-sm">2010 POPULATION & HOUSING CENSUS</p>
              </div>
              <div className="text-right">
                <div className="text-sm">
                  Quest. ID:
                  <CustomFormField
                    control={form.control}
                    name="questId"
                    fieldType={FormFieldType.INPUT}
                    // className="w-32 ml-2"
                  />
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-6 mb-8">
              {locationFields.map((field) => (
                <CustomFormField
                  key={field.name}
                  control={form.control}
                  name={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  fieldType={FormFieldType.INPUT}
                />
              ))}
              
              <div className="col-span-2">
                <CustomFormField
                  control={form.control}
                  name="address"
                  label="A06a Detailed Address of House/Compound"
                  placeholder="Enter Address"
                  fieldType={FormFieldType.TEXTAREA}
                />
              </div>
              
              <CustomFormField
                control={form.control}
                name="phone1"
                label="A06c HH Contact Phone Number 1"
                placeholder="Enter Phone Number"
                fieldType={FormFieldType.PHONE_INPUT}
              />
              
              <CustomFormField
                control={form.control}
                name="phone2"
                label="A06d HH Contact Phone Number 2"
                placeholder="Enter Phone Number"
                fieldType={FormFieldType.PHONE_INPUT}
              />

              <div className="col-span-2">
                <h3 className="text-lg font-semibold mb-4">Enumeration Area Code</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.keys(defaultValues.enumAreaCode).map((key) => (
                    <CustomFormField
                      key={key}
                      control={form.control}
                      name={`enumAreaCode.${key}`}
                      label={`${key.charAt(0).toUpperCase() + key.slice(1)} Code`}
                      placeholder={`Enter ${key} code`}
                      fieldType={FormFieldType.INPUT}
                    />
                  ))}
                </div>
              </div>
            </div>

            <Separator className="my-6" />
          </CardContent>
        </Card>
        <div className="flex justify-end space-x-4">
          <Button 
            type="submit"
            className="bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <span className="mr-2">Processing...</span>
              </span>
            ) : (
              <span className="flex items-center">
                Next  <ChevronRight className="ml-2 h-4 w-4" />
              </span>
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default FirstForm;