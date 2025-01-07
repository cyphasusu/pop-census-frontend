"use client";

import React, { useState } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import CustomFormField, { FormFieldType } from "../CustomField";

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
      <form onSubmit={methods.handleSubmit(handleSubmit)} className="max-w-5xl mx-auto p-4">
        <Card>
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
                <CardTitle className="text-xl font-bold">A16a: HOUSEHOLD ROSTER</CardTitle>
                <p className="text-sm text-gray-600">Usual members and visitors present on census night</p>
              </div>
              <div className="text-right">
                <div className="text-sm">
                  Quest. ID:
                  <CustomFormField
                    control={methods.control}
                    name="questId"
                    fieldType={FormFieldType.INPUT}
                  />
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {fields.map((field, index) => (
              <div key={field.id} className="mb-6 p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Person {index + 1}</h3>
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <CustomFormField
                    control={methods.control}
                    name={`members.${index}.fullName`}
                    label="Full Name"
                    placeholder="Enter full name"
                    fieldType={FormFieldType.INPUT}
                  />

                  <CustomFormField
                    control={methods.control}
                    name={`members.${index}.relationshipCode`}
                    label="Relationship to Head"
                    placeholder="Select relationship"
                    fieldType={FormFieldType.SELECT}
                    options={relationshipOptions}
                  />

                  <div className="flex space-x-4">
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
            ))}

            <div className="flex justify-center mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={addMember}
                disabled={fields.length >= 10}
                className="flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Household Member</span>
              </Button>
            </div>

            <div className="flex justify-between mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                disabled={isLoading}
              >
                Back
              </Button>

              <Button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Next '}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  );
};

export default SecondForm;