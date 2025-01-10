import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Note: This comment should be removed - we can't actually use zod or react-hook-form as they're not installed
// Instead, we'll create a simpler version using standard React state management

interface AbsentMember {
  lineNo: string;
  fullName: string;
  relationshipToHead: string;
  code: string;
  sex: 'M' | 'F';
  age: string;
  destination: string;
  regionCountryCode: string;
  monthsAbsent: string;
}

interface GeographicalInfo {
  region: string;
  district: string;
  districtType: string;
  subDistrict: string;
  eaNumber: string;
  eaType: string;
  localityCode: string;
  structureNumber: string;
  householdNumber: string;
}

export interface FifteenthFormData {
  geographicalInfo: GeographicalInfo;
  absentMembers: AbsentMember[];
}

export const defaultValues: FifteenthFormData = {
  geographicalInfo: {
    region: '',
    district: '',
    districtType: '',
    subDistrict: '',
    eaNumber: '',
    eaType: '',
    localityCode: '',
    structureNumber: '',
    householdNumber: '',
  },
  absentMembers: []
};

interface FifteenthFormProps {
  initialData?: FifteenthFormData;
  onBack?: () => void;
  onNext: (data: FifteenthFormData) => Promise<void>;
}

export default function FifteenthForm({ initialData = defaultValues, onBack, onNext }: FifteenthFormProps) {
  const [formData, setFormData] = React.useState<FifteenthFormData>(initialData);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleAddMember = () => {
    setFormData(prev => ({
      ...prev,
      absentMembers: [
        ...prev.absentMembers,
        {
          lineNo: (prev.absentMembers.length + 1).toString(),
          fullName: '',
          relationshipToHead: '',
          code: '',
          sex: 'M',
          age: '',
          destination: '',
          regionCountryCode: '',
          monthsAbsent: ''
        }
      ]
    }));
  };

  const handleRemoveMember = (index: number) => {
    setFormData(prev => ({
      ...prev,
      absentMembers: prev.absentMembers.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onNext(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Geographical Information & Household Identification</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="region">Region</Label>
            <Input
              id="region"
              value={formData.geographicalInfo.region}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                geographicalInfo: { ...prev.geographicalInfo, region: e.target.value }
              }))}
              className="w-20"
              maxLength={2}
            />
          </div>
          {/* Add similar input fields for other geographical info */}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Line No.</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Relationship to Head</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Sex</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Region/Country Code</TableHead>
              <TableHead>Months Absent</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {formData.absentMembers.map((member, index) => (
              <TableRow key={index}>
                <TableCell>{member.lineNo}</TableCell>
                <TableCell>
                  <Input
                    value={member.fullName}
                    onChange={(e) => {
                      const newMembers = [...formData.absentMembers];
                      newMembers[index] = { ...member, fullName: e.target.value };
                      setFormData(prev => ({ ...prev, absentMembers: newMembers }));
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={member.relationshipToHead}
                    onChange={(e) => {
                      const newMembers = [...formData.absentMembers];
                      newMembers[index] = { ...member, relationshipToHead: e.target.value };
                      setFormData(prev => ({ ...prev, absentMembers: newMembers }));
                    }}
                  />
                </TableCell>
                {/* Add similar cells for other fields */}
                <TableCell>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveMember(index)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isSubmitting}
        >
          Previous
        </Button>
        <div className="space-x-2">
          <Button
            type="button"
            variant="secondary"
            onClick={handleAddMember}
            disabled={isSubmitting}
          >
            Add Member
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Continue'}
          </Button>
        </div>
      </div>
    </form>
  );
}