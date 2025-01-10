"use client";

import React, { useState } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Users, UserPlus, ChevronLeft, ChevronRight } from "lucide-react";
import CustomFormField, { FormFieldType } from "../CustomField";

// Keep original interfaces and types
export interface HouseholdMember {
  personId: string;
  fullName: string;
  relationshipToHead: string;
  relationshipCode: string;
  sex: 'M' | 'F';
  status: 'A' | 'B';
}

export interface HouseholdRosterData {
  members: HouseholdMember[];
  questId: string;
}

interface SecondFormProps {
  initialData?: Partial<HouseholdRosterData>;
  onBack: () => void;
  onNext: (data: HouseholdRosterData) => void;
}

const defaultMember: HouseholdMember = {
  personId: '01',
  fullName: '',
  relationshipToHead: '',
  relationshipCode: '',
  sex: 'M',
  status: 'A'
};

export const defaultValues: HouseholdRosterData = {
  members: [{ ...defaultMember }],
  questId: ''
};

const relationshipOptions = [
  { value: '01', label: 'Head' },
  { value: '02', label: 'Spouse (Wife/Husband)' },
  { value: '03', label: 'Child (Son/Daughter)' },
  { value: '04', label: 'Parent/Parent in-law' },
  { value: '05', label: 'Son/Daughter in-law' },
  { value: '06', label: 'Grandchild' },
  { value: '07', label: 'Brother/Sister' },
  { value: '08', label: 'Step child' },
  { value: '09', label: 'Foster child' },
  { value: '10', label: 'Other relative' },
  { value: '11', label: 'Non-relative' }
];

const SecondForm: React.FC<SecondFormProps> = ({ initialData, onBack, onNext }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const methods = useForm<HouseholdRosterData>({
    defaultValues: {
      members: initialData?.members || [{ ...defaultMember }],
      questId: initialData?.questId || ''
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "members"
  });

  const handleSubmit = async (data: HouseholdRosterData) => {
    setIsLoading(true);
    try {
      await onNext(data);
    } finally {
      setIsLoading(false);
    }
  };

  const addMember = () => {
    if (fields.length < 10) {
      append({ 
        ...defaultMember,
        personId: (fields.length + 1).toString().padStart(2, '0')
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className="max-w-4xl mx-auto">
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
          <div className="flex items-center justify-center space-x-2">
            <div className="bg-blue-50 text-blue-800 py-1 px-3 rounded-full text-sm font-medium">
              Form PHC 1A
            </div>
            <div className="bg-green-50 text-green-800 py-1 px-3 rounded-full text-sm font-medium">
              Household Roster
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <CardTitle>Household Members</CardTitle>
                  <CardDescription>Record all usual members and visitors present on census night</CardDescription>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Quest. ID:</span>
                <CustomFormField
                  control={methods.control}
                  name="questId"
                  fieldType={FormFieldType.INPUT}
                  className="w-24"
                />
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {fields.map((field, index) => (
              <Card key={field.id} className="border border-gray-100 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                        {index + 1}
                      </div>
                      <h3 className="font-medium">Household Member</h3>
                    </div>
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => remove(index)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CustomFormField
                      control={methods.control}
                      name={`members.${index}.fullName`}
                      label="Full Name"
                      placeholder="Enter full name"
                      fieldType={FormFieldType.INPUT}
                      className="bg-gray-50/50"
                    />

                    <CustomFormField
                      control={methods.control}
                      name={`members.${index}.relationshipCode`}
                      label="Relationship to Head"
                      placeholder="Select relationship"
                      fieldType={FormFieldType.SELECT}
                      options={relationshipOptions}
                      className="bg-gray-50/50"
                    />

                    <div className="flex flex-col md:flex-row gap-4 col-span-2">
                      <div className="flex-1">
                        <CustomFormField
                          control={methods.control}
                          name={`members.${index}.sex`}
                          label="Sex"
                          fieldType={FormFieldType.RADIO}
                          options={[
                            { value: 'M', label: 'Male' },
                            { value: 'F', label: 'Female' }
                          ]}
                        />
                      </div>
                      <div className="flex-1">
                        <CustomFormField
                          control={methods.control}
                          name={`members.${index}.status`}
                          label="Status"
                          fieldType={FormFieldType.RADIO}
                          options={[
                            { value: 'A', label: 'Usual Member' },
                            { value: 'B', label: 'Visitor' }
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {fields.length < 10 && (
              <Button
                type="button"
                variant="outline"
                onClick={addMember}
                className="w-full py-6 border-dashed border-2 bg-gray-50/50 hover:bg-gray-100/50"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                Add Household Member
              </Button>
            )}

            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                disabled={isLoading}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>

              <Button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Continue</span>
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  );
};

export default SecondForm;