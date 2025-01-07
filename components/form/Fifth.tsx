import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

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
  { code: '17', label: "Cote d'Ivoire" }
  // ... add other regions as needed
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  const updatePersonRow = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      personRows: prev.personRows.map((row, i) => 
        i === index 
          ? { ...row, [field]: value }
          : row
      )
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-2 border">Person ID</th>
              <th className="p-2 border">Birthplace Region</th>
              <th className="p-2 border">Living in Village?</th>
              <th className="p-2 border">Years Lived</th>
              <th className="p-2 border">Religion</th>
              <th className="p-2 border">Marital Status</th>
            </tr>
          </thead>
          <tbody>
            {formData.personRows.map((person, index) => (
              <tr key={person.id}>
                <td className="p-2 border text-center">{person.id}</td>
                <td className="p-2 border">
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
                </td>
                <td className="p-2 border">
                  <RadioGroup
                    value={person.birthplace.livingInVillage ? 'yes' : 'no'}
                    onValueChange={(value) => updatePersonRow(index, 'birthplace', {
                      ...person.birthplace,
                      livingInVillage: value === 'yes'
                    })}
                    className="flex justify-center gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id={`yes-${index}`} />
                      <Label htmlFor={`yes-${index}`}>Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id={`no-${index}`} />
                      <Label htmlFor={`no-${index}`}>No</Label>
                    </div>
                  </RadioGroup>
                </td>
                <td className="p-2 border">
                  <Input
                    type="number"
                    value={person.yearsLived}
                    onChange={(e) => updatePersonRow(index, 'yearsLived', e.target.value)}
                    className="w-20"
                    min="0"
                  />
                </td>
                <td className="p-2 border">
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
                </td>
                <td className="p-2 border">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
  );
};

export default FifthForm;