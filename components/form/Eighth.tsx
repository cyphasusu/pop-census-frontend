import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export interface EconomicActivityData {
  activities: {
    id: string;
    establishmentName: string;
    mainProduct: string;
    industryCode: string;
    employmentStatus: string;
    employmentSector: string;
  }[];
}

export const defaultValues: EconomicActivityData = {
  activities: Array(10).fill({
    id: '',
    establishmentName: '',
    mainProduct: '',
    industryCode: '',
    employmentStatus: '',
    employmentSector: ''
  })
};

const employmentStatusOptions = [
  { value: '1', label: 'Employee' },
  { value: '2', label: 'Self employed without employees' },
  { value: '3', label: 'Self employed with employees' },
  { value: '4', label: 'Casual worker' },
  { value: '5', label: 'Contributing family worker' },
  { value: '6', label: 'Apprentice' },
  { value: '7', label: 'Domestic employee (househelp)' },
  { value: '8', label: 'Other' }
];

const employmentSectorOptions = [
  { value: '1', label: 'Public (Government)' },
  { value: '2', label: 'Private Formal' },
  { value: '3', label: 'Private Informal' },
  { value: '4', label: 'Semi-Public/Parastatal' },
  { value: '5', label: 'NGO (Local and International)' },
  { value: '6', label: 'International Organisation' }
];

interface Props {
  initialData: EconomicActivityData;
  onBack?: () => void;
  onNext: (data: EconomicActivityData) => void;
}

export default function EconomicActivityForm({ initialData, onBack, onNext }: Props) {
  const { register, handleSubmit } = useForm<EconomicActivityData>({
    defaultValues: initialData
  });

  const onSubmit = (data: EconomicActivityData) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="border rounded-lg p-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="grid grid-cols-4 gap-4 mb-4 p-4 border-b last:border-b-0">
            <div className="flex items-center">
              <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            
            <div className="col-span-3 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Name & Physical Location
                </label>
                <Input
                  {...register(`activities.${index}.establishmentName`)}
                  placeholder="Enter establishment name and location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Main Product or Service
                </label>
                <Input
                  {...register(`activities.${index}.mainProduct`)}
                  placeholder="Enter main product or service"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Industry Code
                </label>
                <Input
                  {...register(`activities.${index}.industryCode`)}
                  placeholder="Enter code"
                  maxLength={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Employment Status
                </label>
                <Select
                  {...register(`activities.${index}.employmentStatus`)}
                >
                  <option value="">Select status</option>
                  {employmentStatusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Employment Sector
                </label>
                <Select
                  {...register(`activities.${index}.employmentSector`)}
                >
                  <option value="">Select sector</option>
                  {employmentSectorOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
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
}