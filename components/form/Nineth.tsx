import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";


interface Props {
  initialData: DisabilityICTData;
  onBack?: () => void;
  onNext: (data: DisabilityICTData) => void;
}

export interface DisabilityICTData {
  members: {
    id: string;
    disabilities: {
      sight: string;
      hearing: string;
      speech: string;
      physical: string;
      intellectual: string;
      emotional: string;
      other: string;
    };
    otherDisabilitySpecify: string;
    ownsMobilePhone: string;
    usesInternet: string;
  }[];
}

export const defaultValues: DisabilityICTData = {
  members: Array(10).fill({
    id: '',
    disabilities: {
      sight: '',
      hearing: '',
      speech: '',
      physical: '',
      intellectual: '',
      emotional: '',
      other: ''
    },
    otherDisabilitySpecify: '',
    ownsMobilePhone: '',
    usesInternet: ''
  })
};

type DisabilityType = keyof DisabilityICTData['members'][0]['disabilities'];

export default function DisabilityICTForm({ initialData, onBack, onNext }: Props) {
  const { control, handleSubmit, watch } = useForm<DisabilityICTData>({
    defaultValues: initialData
  });

  const disabilityTypes: DisabilityType[] = [
    'sight', 'hearing', 'speech', 'physical', 
    'intellectual', 'emotional', 'other'
  ];

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium">Disability Types</h3>
              
              {disabilityTypes.map((type) => (
                <div key={type} className="space-y-2">
                  <Label>{type.charAt(0).toUpperCase() + type.slice(1)}</Label>
                  <Controller
                    control={control}
                    name={`members.${index}.disabilities.${type}` as const}
                    render={({ field }) => (
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="YES" id={`${type}-yes-${index}`} />
                          <Label htmlFor={`${type}-yes-${index}`}>YES</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="NO" id={`${type}-no-${index}`} />
                          <Label htmlFor={`${type}-no-${index}`}>NO</Label>
                        </div>
                      </RadioGroup>
                    )}
                  />
                </div>
              ))}

              {watch(`members.${index}.disabilities.other` as const) === 'YES' && (
                <div>
                  <Label>Specify Other Disability</Label>
                  <Controller
                    control={control}
                    name={`members.${index}.otherDisabilitySpecify` as const}
                    render={({ field }) => (
                      <Input {...field} placeholder="Please specify" />
                    )}
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">ICT Information</h3>
              
              <div className="space-y-2">
                <Label>Owns Mobile Phone</Label>
                <Controller
                  control={control}
                  name={`members.${index}.ownsMobilePhone` as const}
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="YES" id={`mobile-yes-${index}`} />
                        <Label htmlFor={`mobile-yes-${index}`}>YES</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="NO" id={`mobile-no-${index}`} />
                        <Label htmlFor={`mobile-no-${index}`}>NO</Label>
                      </div>
                    </RadioGroup>
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label>Uses Internet</Label>
                <Controller
                  control={control}
                  name={`members.${index}.usesInternet` as const}
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="YES" id={`internet-yes-${index}`} />
                        <Label htmlFor={`internet-yes-${index}`}>YES</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="NO" id={`internet-no-${index}`} />
                        <Label htmlFor={`internet-no-${index}`}>NO</Label>
                      </div>
                    </RadioGroup>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-between">
        {onBack && (
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
        )}
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
}