import React from 'react';
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

interface EmigrantMember {
  no: string;
  fullName: string;
  relationshipToHead: string;
  code: string;
  sex: 'M' | 'F';
  age: string;
  destinationCountry: string;
  destinationCode: string;
  yearOfDeparture: string;
  activityCode: string;
  otherActivity: string;
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

export interface SixteenthFormData {
  geographicalInfo: GeographicalInfo;
  emigrants: EmigrantMember[];
}

export const defaultValues: SixteenthFormData = {
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
  emigrants: []
};

interface SixteenthFormProps {
  initialData?: SixteenthFormData;
  onBack?: () => void;
  onNext: (data: SixteenthFormData) => Promise<void>;
}

export default function SixteenthForm({ initialData = defaultValues, onBack, onNext }: SixteenthFormProps) {
  const [formData, setFormData] = React.useState<SixteenthFormData>(initialData);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleAddEmigrant = () => {
    setFormData(prev => ({
      ...prev,
      emigrants: [
        ...prev.emigrants,
        {
          no: (prev.emigrants.length + 1).toString().padStart(2, '0'),
          fullName: '',
          relationshipToHead: '',
          code: '',
          sex: 'M',
          age: '',
          destinationCountry: '',
          destinationCode: '',
          yearOfDeparture: '',
          activityCode: '',
          otherActivity: ''
        }
      ]
    }));
  };

  const handleRemoveEmigrant = (index: number) => {
    setFormData(prev => ({
      ...prev,
      emigrants: prev.emigrants.filter((_, i) => i !== index)
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

  const updateEmigrantField = (index: number, field: keyof EmigrantMember, value: string) => {
    setFormData(prev => ({
      ...prev,
      emigrants: prev.emigrants.map((emigrant, i) => 
        i === index ? { ...emigrant, [field]: value } : emigrant
      )
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Geographical Information Section */}
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
          {/* Add other geographical info fields similarly */}
        </div>
      </div>

      {/* Emigrants Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <h3 className="p-4 text-lg font-semibold border-b">
          Emigration Outside The Country
          <p className="text-sm font-normal text-gray-600 mt-1">
            Answer for all former household members 15 years and older who have been living continuously for 6 months or more outside Ghana (or intends to do so)
          </p>
        </h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Relationship to Head</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Sex</TableHead>
              <TableHead>Age</TableHead>
              <TableHead className="text-center">Destination</TableHead>
              <TableHead>Year of Departure</TableHead>
              <TableHead>Activity Abroad</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {formData.emigrants.map((emigrant, index) => (
              <TableRow key={index}>
                <TableCell>{emigrant.no}</TableCell>
                <TableCell>
                  <Input
                    value={emigrant.fullName}
                    onChange={(e) => updateEmigrantField(index, 'fullName', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={emigrant.relationshipToHead}
                    onChange={(e) => updateEmigrantField(index, 'relationshipToHead', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={emigrant.code}
                    onChange={(e) => updateEmigrantField(index, 'code', e.target.value)}
                    className="w-16"
                    maxLength={2}
                  />
                </TableCell>
                <TableCell>
                  <RadioGroup
                    value={emigrant.sex}
                    onValueChange={(value) => updateEmigrantField(index, 'sex', value as 'M' | 'F')}
                    className="flex space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="M" id={`sex-m-${index}`} />
                      <Label htmlFor={`sex-m-${index}`}>M</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="F" id={`sex-f-${index}`} />
                      <Label htmlFor={`sex-f-${index}`}>F</Label>
                    </div>
                  </RadioGroup>
                </TableCell>
                <TableCell>
                  <Input
                    value={emigrant.age}
                    onChange={(e) => updateEmigrantField(index, 'age', e.target.value)}
                    className="w-16"
                    type="number"
                  />
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <Input
                      placeholder="Country Name"
                      value={emigrant.destinationCountry}
                      onChange={(e) => updateEmigrantField(index, 'destinationCountry', e.target.value)}
                    />
                    <Input
                      placeholder="Code"
                      value={emigrant.destinationCode}
                      onChange={(e) => updateEmigrantField(index, 'destinationCode', e.target.value)}
                      className="w-16"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <Input
                    value={emigrant.yearOfDeparture}
                    onChange={(e) => updateEmigrantField(index, 'yearOfDeparture', e.target.value)}
                    className="w-20"
                    maxLength={4}
                  />
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <Input
                      placeholder="Code"
                      value={emigrant.activityCode}
                      onChange={(e) => updateEmigrantField(index, 'activityCode', e.target.value)}
                      className="w-16"
                    />
                    <Input
                      placeholder="Other (Specify)"
                      value={emigrant.otherActivity}
                      onChange={(e) => updateEmigrantField(index, 'otherActivity', e.target.value)}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveEmigrant(index)}
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
          Back
        </Button>
        <div className="space-x-2">
          <Button
            type="button"
            variant="secondary"
            onClick={handleAddEmigrant}
            disabled={isSubmitting}
          >
            Add Emigrant
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Next'}
          </Button>
        </div>
      </div>
    </form>
  );
}