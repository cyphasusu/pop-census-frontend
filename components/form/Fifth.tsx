"use client"

import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";

// Types and constants remain the same as your original code
export interface FifthFormData {
  personRows: Array<{
    id: string;
    birthplace: {
      region: string;
      livingInVillage: boolean;
    };
    yearsLived: string;
    religion: {
      code: string;
      otherSpecify?: string;
    };
    maritalStatus: string;
  }>;
}

// Your existing constants (regions, religions, maritalStatuses) here...
export const defaultValues: FifthFormData = {
  personRows: Array(10).fill(null).map((_, index) => ({
    id: `0${index + 1}`,
    birthplace: {
      region: '',
      livingInVillage: false
    },
    yearsLived: '',
    religion: {
      code: '',
      otherSpecify: ''
    },
    maritalStatus: ''
  }))
};

const regions = [
  { code: '01', label: 'Western' },
  { code: '02', label: 'Central' },
  { code: '03', label: 'Greater Accra' },
  { code: '15', label: 'Togo' },
  { code: '16', label: 'Burkina Faso' },
  { code: '17', label: "Cote d'Ivoire" },
  // other codes
];

const religions = [
  { code: '1', label: 'No Religion' },
  { code: '2', label: 'Catholic' },
  { code: '3', label: 'Protestant (Anglican, Lutheran, Presbyterian, Methodist, etc)' },
  { code: '4', label: 'Pentecostal/Charismatic' },
  { code: '5', label: 'Other Christian' },
  { code: '6', label: 'Islam' },
  { code: '7', label: 'Ahmadi' },
  { code: '8', label: 'Traditionalist' },
  { code: '9', label: 'Other (Specify)' }
];

const maritalStatuses = [
  { code: '1', label: 'Never married' },
  { code: '2', label: 'Informal/consensual union/living together' },
  { code: '3', label: 'Married' },
  { code: '4', label: 'Separated' },
  { code: '5', label: 'Divorced' },
  { code: '6', label: 'Widowed' }
];


interface FifthFormProps {
  initialData: FifthFormData;
  onBack?: () => void;
  onNext: (data: FifthFormData) => void;
}

const FifthForm: React.FC<FifthFormProps> = ({ initialData, onBack, onNext }) => {
  const [formData, setFormData] = React.useState<FifthFormData>(initialData);

  const updatePersonRow = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      personRows: prev.personRows.map((row, i) => 
        i === index ? { ...row, [field]: value } : row
      )
    }));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onNext(formData); }} className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-blue-100">
          <Users className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Household Details</h2>
          <p className="text-sm text-gray-500">Personal information for each member</p>
        </div>
      </div>

      <div className="space-y-4">
        {formData.personRows.map((person, index) => (
          <Card key={person.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-medium">{person.id}</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Member {index + 1}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <Label className="mb-2 block">Birthplace</Label>
                  <Select
                    value={person.birthplace.region}
                    onValueChange={(value) => updatePersonRow(index, 'birthplace', { 
                      ...person.birthplace, 
                      region: value 
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map(region => (
                        <SelectItem key={region.code} value={region.code}>
                          {region.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-2 block">Village Resident</Label>
                  <RadioGroup
                    value={person.birthplace.livingInVillage ? 'yes' : 'no'}
                    onValueChange={(value) => updatePersonRow(index, 'birthplace', {
                      ...person.birthplace,
                      livingInVillage: value === 'yes'
                    })}
                    className="flex gap-4"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="yes" id={`yes-${index}`} />
                      <Label htmlFor={`yes-${index}`}>Yes</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="no" id={`no-${index}`} />
                      <Label htmlFor={`no-${index}`}>No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="mb-2 block">Years Lived</Label>
                  <Input
                    type="number"
                    value={person.yearsLived}
                    onChange={(e) => updatePersonRow(index, 'yearsLived', e.target.value)}
                    min="0"
                    className="w-full"
                  />
                </div>

                <div className="lg:col-span-2">
                  <Label className="mb-2 block">Religion</Label>
                  <div className="space-y-2">
                    <Select
                      value={person.religion.code}
                      onValueChange={(value) => updatePersonRow(index, 'religion', {
                        code: value,
                        otherSpecify: value === '9' ? person.religion.otherSpecify : ''
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select religion" />
                      </SelectTrigger>
                      <SelectContent>
                        {religions.map(religion => (
                          <SelectItem key={religion.code} value={religion.code}>
                            {religion.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {person.religion.code === '9' && (
                      <Input
                        placeholder="Specify religion"
                        value={person.religion.otherSpecify}
                        onChange={(e) => updatePersonRow(index, 'religion', {
                          ...person.religion,
                          otherSpecify: e.target.value
                        })}
                      />
                    )}
                  </div>
                </div>

                <div>
                  <Label className="mb-2 block">Marital Status</Label>
                  <Select
                    value={person.maritalStatus}
                    onValueChange={(value) => updatePersonRow(index, 'maritalStatus', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {maritalStatuses.map(status => (
                        <SelectItem key={status.code} value={status.code}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between pt-6">
        {onBack && (
          <Button type="button" variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
        )}
        <Button type="submit" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
          Continue
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};

export default FifthForm;