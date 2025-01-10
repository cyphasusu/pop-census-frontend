import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ChevronRight } from 'lucide-react';

export interface MortalityICTData {
  hadDeaths: string;
  deceased: {
    name: string;
    sex: string;
    ageAtDeath: string;
    wasAccidentalDeath: string;
    pregnancyRelatedDeath: string;
  }[];
  ictInfo: {
    hasFixedPhone: string;
    hasComputer: string;
  };
}

export const defaultValues: MortalityICTData = {
  hadDeaths: '',
  deceased: Array(6).fill({
    name: '',
    sex: '',
    ageAtDeath: '',
    wasAccidentalDeath: '',
    pregnancyRelatedDeath: ''
  }),
  ictInfo: {
    hasFixedPhone: '',
    hasComputer: ''
  }
};

interface Props {
  initialData: MortalityICTData;
  onBack?: () => void;
  onNext: (data: MortalityICTData) => void;
}

export default function MortalityICTForm({ initialData, onBack, onNext }: Props) {
  const { register, watch, handleSubmit } = useForm<MortalityICTData>({
    defaultValues: initialData
  });

  const hadDeaths = watch('hadDeaths');

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div className="border rounded-lg p-4">
        <Label>Has any member of this household died in the past 12 months?</Label>
        <RadioGroup
          {...register('hadDeaths')}
          className="flex gap-4 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="YES" id="deaths-yes" />
            <Label htmlFor="deaths-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="NO" id="deaths-no" />
            <Label htmlFor="deaths-no">No</Label>
          </div>
        </RadioGroup>
      </div>

      {hadDeaths === 'YES' && (
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <Label>Name of deceased</Label>
                  <Input {...register(`deceased.${index}.name`)} />
                </div>

                <div>
                  <Label>Sex</Label>
                  <RadioGroup
                    {...register(`deceased.${index}.sex`)}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Male" id={`sex-male-${index}`} />
                      <Label htmlFor={`sex-male-${index}`}>Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Female" id={`sex-female-${index}`} />
                      <Label htmlFor={`sex-female-${index}`}>Female</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>Age at death</Label>
                  <Input
                    type="number"
                    min="0"
                    {...register(`deceased.${index}.ageAtDeath`)}
                  />
                </div>

                <div>
                  <Label>Accidental death?</Label>
                  <RadioGroup
                    {...register(`deceased.${index}.wasAccidentalDeath`)}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="YES" id={`accidental-yes-${index}`} />
                      <Label htmlFor={`accidental-yes-${index}`}>Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="NO" id={`accidental-no-${index}`} />
                      <Label htmlFor={`accidental-no-${index}`}>No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {watch(`deceased.${index}.sex`) === 'Female' && (
                  <div>
                    <Label>Pregnancy-related death?</Label>
                    <RadioGroup
                      {...register(`deceased.${index}.pregnancyRelatedDeath`)}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="YES" id={`pregnancy-yes-${index}`} />
                        <Label htmlFor={`pregnancy-yes-${index}`}>Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="NO" id={`pregnancy-no-${index}`} />
                        <Label htmlFor={`pregnancy-no-${index}`}>No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="border rounded-lg p-4 space-y-4">
        <div>
          <Label>Does the household have a fixed telephone line at home?</Label>
          <RadioGroup
            {...register('ictInfo.hasFixedPhone')}
            className="flex gap-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="YES" id="phone-yes" />
              <Label htmlFor="phone-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="NO" id="phone-no" />
              <Label htmlFor="phone-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>Does the household own a desktop or laptop computer?</Label>
          <RadioGroup
            {...register('ictInfo.hasComputer')}
            className="flex gap-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="YES" id="computer-yes" />
              <Label htmlFor="computer-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="NO" id="computer-no" />
              <Label htmlFor="computer-no">No</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="flex justify-between">
        {onBack && <Button type="button" variant="outline" onClick={onBack}>Previous</Button>}
        <Button className='bg-blue-600 hover:bg-blue-700 flex items-center space-x-2' type="submit"><span>Continue</span>
        <ChevronRight className="h-4 w-4" /></Button>
      </div>
    </form>
  );
}