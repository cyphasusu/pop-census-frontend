import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  Eye, 
  Ear, 
  MessageSquare, 
  Activity, 
  Brain, 
  Heart, 
  Plus, 
  Smartphone, 
  Globe,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  ChevronRight
} from 'lucide-react';

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

const disabilityIcons = {
  sight: Eye,
  hearing: Ear,
  speech: MessageSquare,
  physical: Activity,
  intellectual: Brain,
  emotional: Heart,
  other: Plus
};

export default function DisabilityICTForm({ initialData, onBack, onNext }: Props) {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const { control, handleSubmit, watch } = useForm<DisabilityICTData>({
    defaultValues: initialData
  });

  const disabilityTypes: DisabilityType[] = [
    'sight', 'hearing', 'speech', 'physical', 
    'intellectual', 'emotional', 'other'
  ];

  const hasResponses = (index: number) => {
    const member = watch(`members.${index}`);
    return Object.values(member.disabilities).some(value => value === 'YES') ||
           member.ownsMobilePhone === 'YES' ||
           member.usesInternet === 'YES';
  };

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div className="space-y-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <div 
              onClick={() => setExpandedIndex(index)}
              className={`p-4 flex items-center justify-between cursor-pointer transition-colors
                ${expandedIndex === index ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center
                  ${hasResponses(index) ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}>
                  {String(index + 1).padStart(2, '0')}
                </div>
                <span className="font-medium">Person {index + 1}</span>
                {hasResponses(index) && (
                  <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                    Has Responses
                  </span>
                )}
              </div>
              {expandedIndex === index ? <ChevronUp /> : <ChevronDown />}
            </div>

            {expandedIndex === index && (
              <div className="p-6 border-t space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-blue-500" />
                      Disability Information
                    </h3>
                    
                    <div className="space-y-6">
                      {disabilityTypes.map((type) => {
                        const Icon = disabilityIcons[type];
                        return (
                          <div key={type} className="space-y-2">
                            <Label className="flex items-center gap-2">
                              <Icon className="w-4 h-4 text-gray-500" />
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </Label>
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
                                    <Label htmlFor={`${type}-yes-${index}`}>Yes</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="NO" id={`${type}-no-${index}`} />
                                    <Label htmlFor={`${type}-no-${index}`}>No</Label>
                                  </div>
                                </RadioGroup>
                              )}
                            />
                          </div>
                        );
                      })}

                      {watch(`members.${index}.disabilities.other`) === 'YES' && (
                        <div className="space-y-2 pl-6 border-l-2 border-blue-200">
                          <Label>Please specify other disability</Label>
                          <Controller
                            control={control}
                            name={`members.${index}.otherDisabilitySpecify`}
                            render={({ field }) => (
                              <Input {...field} placeholder="Enter disability details" />
                            )}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Globe className="w-5 h-5 text-blue-500" />
                      Technology Access
                    </h3>
                    
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-gray-500" />
                          Owns Mobile Phone
                        </Label>
                        <Controller
                          control={control}
                          name={`members.${index}.ownsMobilePhone`}
                          render={({ field }) => (
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              className="flex gap-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="YES" id={`mobile-yes-${index}`} />
                                <Label htmlFor={`mobile-yes-${index}`}>Yes</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="NO" id={`mobile-no-${index}`} />
                                <Label htmlFor={`mobile-no-${index}`}>No</Label>
                              </div>
                            </RadioGroup>
                          )}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-gray-500" />
                          Uses Internet
                        </Label>
                        <Controller
                          control={control}
                          name={`members.${index}.usesInternet`}
                          render={({ field }) => (
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              className="flex gap-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="YES" id={`internet-yes-${index}`} />
                                <Label htmlFor={`internet-yes-${index}`}>Yes</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="NO" id={`internet-no-${index}`} />
                                <Label htmlFor={`internet-no-${index}`}>No</Label>
                              </div>
                            </RadioGroup>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
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
}