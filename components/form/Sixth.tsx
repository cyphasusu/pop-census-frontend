import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp, GraduationCap,  ChevronRight } from 'lucide-react';


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
  const [expandedRow, setExpandedRow] = React.useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  const updatePersonRow = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      personRows: prev.personRows.map((row, i) => 
        i === index ? { ...row, [field]: value } : row
      )
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4">
        {formData.personRows.map((person, index) => (
          <Card key={person.id} className="overflow-hidden border border-gray-200">
            <div 
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setExpandedRow(expandedRow === person.id ? null : person.id)}
            >
              <div className="flex items-center space-x-4">
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Person {person.id}</h3>
                  <p className="text-sm text-gray-500">
                    {person.education.everAttended === 'NOW' ? 'Currently in school' : 
                     person.education.everAttended === 'PAST' ? 'Previously attended' : 
                     'Never attended'}
                  </p>
                </div>
              </div>
              {expandedRow === person.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>

            {expandedRow === person.id && (
              <div className="p-4 border-t bg-gray-50 space-y-6">
                <div className="space-y-4">
                  <Label className="text-sm font-medium">Literacy Level</Label>
                  <Select
                    value={person.literacy.code}
                    onValueChange={(value) => updatePersonRow(index, 'literacy', {
                      code: value,
                      otherSpecify: value === '7' ? person.literacy.otherSpecify : ''
                    })}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select literacy level" />
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
                      placeholder="Specify other literacy"
                      value={person.literacy.otherSpecify}
                      onChange={(e) => updatePersonRow(index, 'literacy', {
                        ...person.literacy,
                        otherSpecify: e.target.value
                      })}
                      className="mt-2"
                    />
                  )}
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-medium">Education Status</Label>
                  <RadioGroup
                    value={person.education.everAttended}
                    onValueChange={(value: 'NEVER' | 'NOW' | 'PAST') => updatePersonRow(index, 'education', {
                      ...person.education,
                      everAttended: value
                    })}
                    className="grid grid-cols-3 gap-4"
                  >
                    {[
                      { value: 'NEVER', label: 'Never Attended' },
                      { value: 'NOW', label: 'Currently Attending' },
                      { value: 'PAST', label: 'Previously Attended' }
                    ].map((option) => (
                      <div key={option.value} className="flex items-center space-x-2 bg-white p-3 rounded-lg border">
                        <RadioGroupItem value={option.value} id={`${option.value}-${index}`} />
                        <Label htmlFor={`${option.value}-${index}`}>{option.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {person.education.everAttended !== 'NEVER' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Education Level</Label>
                      <Select
                        value={person.education.currentLevel}
                        onValueChange={(value) => updatePersonRow(index, 'education', {
                          ...person.education,
                          currentLevel: value
                        })}
                      >
                        <SelectTrigger className="bg-white">
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
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Highest Grade</Label>
                      <Input
                        type="number"
                        value={person.education.highestGrade || ''}
                        onChange={(e) => updatePersonRow(index, 'education', {
                          ...person.education,
                          highestGrade: e.target.value
                        })}
                        className="bg-white"
                        min="0"
                        max="9"
                        placeholder="Enter grade"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>

      <div className="flex justify-between pt-6">
        {onBack && (
          <Button type="button" variant="outline" onClick={onBack}>
            Previous
          </Button>
        )}
        <Button className='bg-blue-600 hover:bg-blue-700 flex items-center space-x-2' type="submit"><span>Continue</span>
        <ChevronRight className="h-4 w-4" /></Button>
      </div>
    </form>
  );
};

export default SixthForm;