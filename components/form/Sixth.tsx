import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export interface SixthFormData {
  personRows: Array<{
    id: string;
    literacy: {
      code: string;
      otherSpecify?: string;
    };
    education: {
      everAttended: 'NEVER' | 'NOW' | 'PAST';
      currentLevel?: string;
      highestGrade?: string;
    };
  }>;
}

export const defaultValues: SixthFormData = {
  personRows: Array(10).fill(null).map((_, index) => ({
    id: `0${index + 1}`,
    literacy: {
      code: '',
      otherSpecify: ''
    },
    education: {
      everAttended: 'NEVER'
    }
  }))
};

const literacyOptions = [
  { code: '1', label: 'None (not literate)' },
  { code: '2', label: 'English only' },
  { code: '3', label: 'Ghanaian language only' },
  { code: '4', label: 'English and Ghanaian language' },
  { code: '5', label: 'English and French' },
  { code: '6', label: 'English, French and Ghanaian language' },
  { code: '7', label: 'Other (Specify)' }
];

const educationLevels = [
  { code: '01', label: 'Nursery' },
  { code: '02', label: 'Kindergarten' },
  { code: '03', label: 'Primary' },
  { code: '04', label: 'JSS/JHS' },
  { code: '05', label: 'Middle' },
  { code: '06', label: 'SSS/SHS' },
  { code: '07', label: 'Secondary' },
  { code: '08', label: 'Voc/technical/commercial' },
  { code: '09', label: 'Post middle/secondary certificate' },
  { code: '10', label: 'Post secondary Diploma' },
  { code: '11', label: 'Bachelor degree' },
  { code: '12', label: 'Post graduate (Cert., Diploma, Masters, PHD, etc)' }
];

interface SixthFormProps {
  initialData: SixthFormData;
  onBack?: () => void;
  onNext: (data: SixthFormData) => void;
}

const SixthForm: React.FC<SixthFormProps> = ({ initialData, onBack, onNext }) => {
  const [formData, setFormData] = React.useState<SixthFormData>(initialData);

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
              <th className="p-2 border">Literacy</th>
              <th className="p-2 border">Ever Attended School</th>
              <th className="p-2 border">Current/Highest Level</th>
              <th className="p-2 border">Highest Grade</th>
            </tr>
          </thead>
          <tbody>
            {formData.personRows.map((person, index) => (
              <tr key={person.id}>
                <td className="p-2 border text-center">{person.id}</td>
                <td className="p-2 border">
                  <div className="space-y-2">
                    <Select
                      value={person.literacy.code}
                      onValueChange={(value) => updatePersonRow(index, 'literacy', {
                        code: value,
                        otherSpecify: value === '7' ? person.literacy.otherSpecify : ''
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select literacy" />
                      </SelectTrigger>
                      <SelectContent>
                        {literacyOptions.map(option => (
                          <SelectItem key={option.code} value={option.code}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {person.literacy.code === '7' && (
                      <Input
                        placeholder="Specify other"
                        value={person.literacy.otherSpecify}
                        onChange={(e) => updatePersonRow(index, 'literacy', {
                          ...person.literacy,
                          otherSpecify: e.target.value
                        })}
                      />
                    )}
                  </div>
                </td>
                <td className="p-2 border">
                  <RadioGroup
                    value={person.education.everAttended}
                    onValueChange={(value: 'NEVER' | 'NOW' | 'PAST') => updatePersonRow(index, 'education', {
                      ...person.education,
                      everAttended: value
                    })}
                    className="flex flex-col gap-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="NEVER" id={`never-${index}`} />
                      <Label htmlFor={`never-${index}`}>Never</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="NOW" id={`now-${index}`} />
                      <Label htmlFor={`now-${index}`}>Now</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="PAST" id={`past-${index}`} />
                      <Label htmlFor={`past-${index}`}>Past</Label>
                    </div>
                  </RadioGroup>
                </td>
                <td className="p-2 border">
                  {person.education.everAttended !== 'NEVER' && (
                    <Select
                      value={person.education.currentLevel}
                      onValueChange={(value) => updatePersonRow(index, 'education', {
                        ...person.education,
                        currentLevel: value
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        {educationLevels.map(level => (
                          <SelectItem key={level.code} value={level.code}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </td>
                <td className="p-2 border">
                  {person.education.everAttended !== 'NEVER' && (
                    <Input
                      type="number"
                      value={person.education.highestGrade || ''}
                      onChange={(e) => updatePersonRow(index, 'education', {
                        ...person.education,
                        highestGrade: e.target.value
                      })}
                      className="w-20"
                      min="0"
                      max="9"
                      placeholder="Grade"
                    />
                  )}
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

export default SixthForm;