import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Plus, Minus, Building2, Briefcase, BarChart3, Users, Building, ChevronRight } from 'lucide-react';

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
  const [expandedIndex, setExpandedIndex] = useState(0);
  const { register, handleSubmit, watch, setValue } = useForm<EconomicActivityData>({
    defaultValues: initialData
  });

  const activities = watch('activities');

  const onSubmit = (data: EconomicActivityData) => {
    onNext(data);
  };

  const isActivityEmpty = (index: number) => {
    const activity = activities[index];
    return !activity.establishmentName && 
           !activity.mainProduct && 
           !activity.industryCode && 
           !activity.employmentStatus && 
           !activity.employmentSector;
  };

  const handleSelectChange = (value: string, index: number, field: 'employmentStatus' | 'employmentSector') => {
    setValue(`activities.${index}.${field}`, value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <Card 
            key={index}
            className={`transition-all duration-200 ${
              expandedIndex === index ? 'ring-2 ring-blue-500' : 'hover:bg-gray-50'
            }`}
          >
            <div 
              className="p-4 flex items-center justify-between cursor-pointer"
              onClick={() => setExpandedIndex(index)}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isActivityEmpty(index) ? 'bg-gray-100' : 'bg-blue-100 text-blue-600'
                }`}>
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="flex items-center space-x-2">
                  <Building2 className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">
                    {activities[index].establishmentName || 'New Activity Record'}
                  </span>
                </div>
              </div>
              {expandedIndex === index ? (
                <Minus className="w-5 h-5 text-gray-400" />
              ) : (
                <Plus className="w-5 h-5 text-gray-400" />
              )}
            </div>

            {expandedIndex === index && (
              <div className="p-4 border-t bg-gray-50 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <Building2 className="w-4 h-4" />
                      <span>Name & Physical Location</span>
                    </label>
                    <Input
                      {...register(`activities.${index}.establishmentName`)}
                      placeholder="Enter establishment name and location"
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <Briefcase className="w-4 h-4" />
                      <span>Main Product or Service</span>
                    </label>
                    <Input
                      {...register(`activities.${index}.mainProduct`)}
                      placeholder="Enter main product or service"
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <BarChart3 className="w-4 h-4" />
                      <span>Industry Code</span>
                    </label>
                    <Input
                      {...register(`activities.${index}.industryCode`)}
                      placeholder="Enter code"
                      maxLength={4}
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <Users className="w-4 h-4" />
                      <span>Employment Status</span>
                    </label>
                    <Select
                      onValueChange={(value) => handleSelectChange(value, index, 'employmentStatus')}
                      value={activities[index].employmentStatus}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {employmentStatusOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <Building className="w-4 h-4" />
                      <span>Employment Sector</span>
                    </label>
                    <Select
                      onValueChange={(value) => handleSelectChange(value, index, 'employmentSector')}
                      value={activities[index].employmentSector}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select sector" />
                      </SelectTrigger>
                      <SelectContent>
                        {employmentSectorOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      <div className="flex justify-between pt-6">
        {onBack && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onBack}
          >
           Previous
          </Button>
        )}
        <Button className='bg-blue-600 hover:bg-blue-700 flex items-center space-x-2' type="submit">
        <span>Continue</span>
        <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}