"use client"

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, MapPin, Phone, Building } from "lucide-react";
import CustomFormField, { FormFieldType } from "../CustomField";

// Maintain original exported types
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

// Maintain original form fields configuration
const locationFields = [
  { name: "regionName", label: "A01 Region Name", placeholder: "Enter Region Name" },
  { name: "districtName", label: "A02 District Name", placeholder: "Enter District Name" },
  { name: "districtType", label: "A03 District Type", placeholder: "Enter District Type" },
  { name: "subDistrict", label: "A04 Sub-District", placeholder: "Enter Sub-District" },
  { name: "localityName", label: "A05 Locality Name", placeholder: "Enter Locality Name" },
] as const;

// Maintain original default values export
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

interface FirstFormProps {
  initialData?: Partial<FirstFormData>;
  onBack?: () => void;
  onNext: (data: FirstFormData) => void;
}

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
      <form onSubmit={form.handleSubmit(handleSubmit)} className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center space-y-2">
          <div className="flex items-center justify-center space-x-3">
            <img 
              src="/assets/coatofarms.jpeg"
              alt="Ghana Coat of Arms"
              className="h-16 w-16 object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">REPUBLIC OF GHANA</h1>
              <p className="text-sm text-gray-600">Ghana Statistical Service - 2010 Census</p>
            </div>
          </div>
          <div className="bg-blue-50 text-blue-800 py-1 px-3 rounded-full text-sm font-medium inline-block">
            Form PHC 1A - Household Population
          </div>
        </div>

        {/* Location Information Card */}
        <Card className="mb-6 shadow-md border-0">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              <CardTitle>Location Details</CardTitle>
            </div>
            <CardDescription>Enter the geographical information for this household</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {locationFields.map((field) => (
              <CustomFormField
                key={field.name}
                control={form.control}
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
                fieldType={FormFieldType.INPUT}
                className="bg-gray-50/50"
              />
            ))}
          </CardContent>
        </Card>

        {/* Contact Information Card */}
        <Card className="mb-6 shadow-md border-0">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-blue-600" />
              <CardTitle>Contact Information</CardTitle>
            </div>
            <CardDescription>Provide contact details for the household</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <CustomFormField
              control={form.control}
              name="address"
              label="A06a Detailed Address of House/Compound"
              placeholder="Enter complete address details"
              fieldType={FormFieldType.TEXTAREA}
              className="bg-gray-50/50"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CustomFormField
                control={form.control}
                name="phone1"
                label="A06c HH Contact Phone Number 1"
                placeholder="Enter main contact number"
                fieldType={FormFieldType.PHONE_INPUT}
                className="bg-gray-50/50"
              />
              <CustomFormField
                control={form.control}
                name="phone2"
                label="A06d HH Contact Phone Number 2"
                placeholder="Enter alternative number (optional)"
                fieldType={FormFieldType.PHONE_INPUT}
                className="bg-gray-50/50"
              />
            </div>
          </CardContent>
        </Card>

        {/* Enumeration Area Code Card */}
        <Card className="mb-6 shadow-md border-0">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Building className="h-5 w-5 text-blue-600" />
              <CardTitle>Enumeration Area Code</CardTitle>
            </div>
            <CardDescription>Enter the area codes for this enumeration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.keys(defaultValues.enumAreaCode).map((key) => (
                <CustomFormField
                  key={key}
                  control={form.control}
                  name={`enumAreaCode.${key}`}
                  label={`${key.charAt(0).toUpperCase() + key.slice(1)} Code`}
                  placeholder={`Enter ${key} code`}
                  fieldType={FormFieldType.INPUT}
                  className="bg-gray-50/50"
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Footer Actions */}
        <div className="mt-8 flex justify-end space-x-4">
          <Button
            type="submit"
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing...</span>
              </span>
            ) : (
              <span className="flex items-center space-x-2">
                <span>Continue</span>
                <ChevronRight className="h-4 w-4" />
              </span>
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default FirstForm;