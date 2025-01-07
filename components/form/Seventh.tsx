import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export interface SeventhFormData {
  personRows: Array<{
    id: string;
    economicActivity: {
      didWork: boolean;
      engagement?: string;
      notWorkReason?: string;
      occupation?: {
        description: string;
        code: string;
      };
    };
  }>;
}

export const defaultValues: SeventhFormData = {
  personRows: Array(10).fill(null).map((_, index) => ({
    id: `0${index + 1}`,
    economicActivity: {
      didWork: false,
      occupation: {
        description: '',
        code: ''
      }
    }
  }))
};

const engagementOptions = [
  { code: '1', label: 'Did not work but had job to go back to' },
  { code: '2', label: 'Worked before, seeking work and available for work' },
  { code: '3', label: 'Seeking work for the first time and available for work' },
  { code: '4', label: 'Did voluntary work without pay' },
  { code: '5', label: 'Did not work and not seeking work' }
];

const notWorkReasons = [
  { code: '1', label: 'Did home duties (household chores/ full time homemaker)' },
  { code: '2', label: 'Full time education/ student' },
  { code: '3', label: 'Pensioner/Retired' },
  { code: '4', label: 'Disabled/too sick to work' },
  { code: '5', label: 'Too old/too young' },
  { code: '6', label: 'Other' }
];

interface SeventhFormProps {
  initialData: SeventhFormData;
  onBack?: () => void;
  onNext: (data: SeventhFormData) => void;
}

const SeventhForm: React.FC<SeventhFormProps> = ({ initialData, onBack, onNext }) => {
  const [formData, setFormData] = React.useState<SeventhFormData>(initialData);

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
              <th className="p-2 border">Economic Activity</th>
              <th className="p-2 border">Engagement/Status</th>
              <th className="p-2 border">Not Working Reason</th>
              <th className="p-2 border">Occupation Details</th>
            </tr>
          </thead>
          <tbody>
            {formData.personRows.map((person, index) => (
              <tr key={person.id}>
                <td className="p-2 border text-center">{person.id}</td>
                <td className="p-2 border">
                  <RadioGroup
                    value={person.economicActivity.didWork ? 'yes' : 'no'}
                    onValueChange={(value) => updatePersonRow(index, 'economicActivity', {
                      ...person.economicActivity,
                      didWork: value === 'yes'
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
                  {!person.economicActivity.didWork && (
                    <Select
                      value={person.economicActivity.engagement}
                      onValueChange={(value) => updatePersonRow(index, 'economicActivity', {
                        ...person.economicActivity,
                        engagement: value
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select engagement" />
                      </SelectTrigger>
                      <SelectContent>
                        {engagementOptions.map(option => (
                          <SelectItem key={option.code} value={option.code}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </td>
                <td className="p-2 border">
                  {!person.economicActivity.didWork && 
                   person.economicActivity.engagement === '5' && (
                    <Select
                      value={person.economicActivity.notWorkReason}
                      onValueChange={(value) => updatePersonRow(index, 'economicActivity', {
                        ...person.economicActivity,
                        notWorkReason: value
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select reason" />
                      </SelectTrigger>
                      <SelectContent>
                        {notWorkReasons.map(reason => (
                          <SelectItem key={reason.code} value={reason.code}>
                            {reason.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </td>
                <td className="p-2 border">
                  {(person.economicActivity.didWork || 
                    person.economicActivity.engagement === '1') && (
                    <div className="space-y-2">
                      <Input
                        placeholder="Detailed occupation description"
                        value={person.economicActivity.occupation?.description || ''}
                        onChange={(e) => updatePersonRow(index, 'economicActivity', {
                          ...person.economicActivity,
                          occupation: {
                            ...person.economicActivity.occupation,
                            description: e.target.value
                          }
                        })}
                      />
                      <Input
                        placeholder="Occupation code"
                        className="w-24"
                        maxLength={4}
                        value={person.economicActivity.occupation?.code || ''}
                        onChange={(e) => updatePersonRow(index, 'economicActivity', {
                          ...person.economicActivity,
                          occupation: {
                            ...person.economicActivity.occupation,
                            code: e.target.value
                          }
                        })}
                      />
                    </div>
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

export default SeventhForm;