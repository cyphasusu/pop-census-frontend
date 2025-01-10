import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight } from 'lucide-react';

export interface FertilityData {
  members: {
    id: string;
    childrenEverBorn: {
      male: string;
      female: string;
    };
    childrenSurviving: {
      male: string;
      female: string;
    };
    childrenBornPast12Months: {
      boy: string;
      girl: string;
    };
  }[];
}

export const defaultValues: FertilityData = {
  members: Array(10).fill({
    id: '',
    childrenEverBorn: { male: '', female: '' },
    childrenSurviving: { male: '', female: '' },
    childrenBornPast12Months: { boy: '', girl: '' }
  })
};

interface Props {
  initialData: FertilityData;
  onBack?: () => void;
  onNext: (data: FertilityData) => void;
}

export default function FertilityForm({ initialData, onBack, onNext }: Props) {
  const { register, handleSubmit } = useForm<FertilityData>({
    defaultValues: initialData
  });

  const onSubmit = (data: FertilityData) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium">Children Ever Born</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Male</label>
                  <Input
                    type="number"
                    min="0"
                    {...register(`members.${index}.childrenEverBorn.male`)}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Female</label>
                  <Input
                    type="number"
                    min="0"
                    {...register(`members.${index}.childrenEverBorn.female`)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Children Surviving</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Male</label>
                  <Input
                    type="number"
                    min="0"
                    {...register(`members.${index}.childrenSurviving.male`)}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Female</label>
                  <Input
                    type="number"
                    min="0"
                    {...register(`members.${index}.childrenSurviving.female`)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Born in Past 12 Months</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Boy</label>
                  <Input
                    type="number"
                    min="0"
                    {...register(`members.${index}.childrenBornPast12Months.boy`)}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Girl</label>
                  <Input
                    type="number"
                    min="0"
                    {...register(`members.${index}.childrenBornPast12Months.girl`)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-between">
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
}