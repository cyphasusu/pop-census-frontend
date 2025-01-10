"use client"

import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronRight } from 'lucide-react';

interface HousingConditionsContinuedData {
  domesticWaterSource: string;
  cookingFuel: string;
  cookingSpace: string;
  bathingFacility: string;
  toiletFacility: string;
  sharedToilet: string;
  householdsSharedToilet?: number;
  solidWasteDisposal: string;
  liquidWasteDisposal: string;
  otherSpecify?: {
    water?: string;
    cookingFuel?: string;
    cookingSpace?: string;
    bathingFacility?: string;
    toiletFacility?: string;
    solidWaste?: string;
    liquidWaste?: string;
  };
}

export default function HousingConditionsContinuedForm({
  initialData,
  onBack,
  onNext
}: {
  initialData?: HousingConditionsContinuedData;
  onBack?: () => void;
  onNext: (data: HousingConditionsContinuedData) => void;
}) {
  const { register, handleSubmit, watch, setValue } = useForm<HousingConditionsContinuedData>({
    defaultValues: initialData || {}
  });

  const toiletFacility = watch('toiletFacility');
  const sharedToilet = watch('sharedToilet');

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label>Main source of water for domestic use</Label>
            <Select onValueChange={v => setValue('domesticWaterSource', v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select water source" />
              </SelectTrigger>
              <SelectContent>
                {[
                  ['01', 'Pipe-borne inside dwelling'],
                  ['02', 'Pipe-borne outside dwelling'],
                  ['03', 'Public tap/Standpipe'],
                  ['04', 'Borehole/Pump/Tubewell'],
                  ['05', 'Protected well'],
                  ['06', 'Rain water'],
                  ['07', 'Protected spring'],
                  ['08', 'Tanker supply/Vendor provided'],
                  ['09', 'Unprotected well'],
                  ['10', 'Unprotected spring'],
                  ['11', 'River/Stream'],
                  ['12', 'Dugout/Pond/Lake/Dam/Canal'],
                  ['13', 'Other']
                ].map(([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Main source of cooking fuel</Label>
            <Select onValueChange={v => setValue('cookingFuel', v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select cooking fuel" />
              </SelectTrigger>
              <SelectContent>
                {[
                  ['01', 'None, no cooking'],
                  ['02', 'Wood'],
                  ['03', 'Gas'],
                  ['04', 'Electricity'],
                  ['05', 'Kerosene'],
                  ['06', 'Charcoal'],
                  ['07', 'Crop residue'],
                  ['08', 'Saw dust'],
                  ['09', 'Animal waste'],
                  ['10', 'Other']
                ].map(([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Type of cooking space</Label>
            <Select onValueChange={v => setValue('cookingSpace', v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select cooking space" />
              </SelectTrigger>
              <SelectContent>
                {[
                  ['1', 'No cooking'],
                  ['2', 'Separate room for exclusive use'],
                  ['3', 'Separate room shared with other household(s)'],
                  ['4', 'Enclosure without roof'],
                  ['5', 'Structure with roof but without walls'],
                  ['6', 'Bedroom/Hall/Living room'],
                  ['7', 'Veranda'],
                  ['8', 'Open space in compound'],
                  ['9', 'Other']
                ].map(([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Type of bathing facility</Label>
            <Select onValueChange={v => setValue('bathingFacility', v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select bathing facility" />
              </SelectTrigger>
              <SelectContent>
                {[
                  ['1', 'Own bathroom for exclusive use'],
                  ['2', 'Shared separate bathroom in same house'],
                  ['3', 'Private open cubicle'],
                  ['4', 'Shared open cubicle'],
                  ['5', 'Public bath house'],
                  ['6', 'Bathroom in another house'],
                  ['7', 'Open space around house'],
                  ['8', 'In a river/pond/lake/dam'],
                  ['9', 'Other']
                ].map(([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Type of toilet facility</Label>
            <Select onValueChange={v => setValue('toiletFacility', v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select toilet facility" />
              </SelectTrigger>
              <SelectContent>
                {[
                  ['1', 'No facility (e.g bush/beach/field)'],
                  ['2', 'W.C.'],
                  ['3', 'Pit latrine'],
                  ['4', 'KVIP'],
                  ['5', 'Bucket/Pan'],
                  ['6', 'Public toilet'],
                  ['7', 'Other']
                ].map(([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {toiletFacility && toiletFacility !== '1' && toiletFacility !== '6' && (
            <div>
              <Label>Do you share this toilet facility?</Label>
              <RadioGroup onValueChange={v => setValue('sharedToilet', v)}>
                <div className="flex items-center space-x-2">
                  {[
                    ['1', 'Yes, with other household(s) in same house'],
                    ['2', 'Yes, with other household(s) in different house'],
                    ['3', 'Yes, with other household(s) and located in different house'],
                    ['4', 'No']
                  ].map(([value, label]) => (
                    <div key={value} className="flex items-center space-x-1">
                      <RadioGroupItem value={value} id={`toilet-${value}`} />
                      <Label htmlFor={`toilet-${value}`}>{label}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>

              {sharedToilet && sharedToilet !== '4' && (
                <div className="mt-2">
                  <Label>Number of households sharing toilet</Label>
                  <Input type="number" {...register('householdsSharedToilet')} min={1} />
                </div>
              )}
            </div>
          )}

          <div>
            <Label>Solid waste disposal method</Label>
            <Select onValueChange={v => setValue('solidWasteDisposal', v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select disposal method" />
              </SelectTrigger>
              <SelectContent>
                {[
                  ['1', 'Collected'],
                  ['2', 'Burned by household'],
                  ['3', 'Public dump (Container)'],
                  ['4', 'Public dump (Open space)'],
                  ['5', 'Dumped indiscriminately'],
                  ['6', 'Buried by household'],
                  ['7', 'Other']
                ].map(([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Liquid waste disposal method</Label>
            <Select onValueChange={v => setValue('liquidWasteDisposal', v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select disposal method" />
              </SelectTrigger>
              <SelectContent>
                {[
                  ['1', 'Through the sewage system'],
                  ['2', 'Through drainage system into a gutter'],
                  ['3', 'Through drainage into a pit'],
                  ['4', 'Thrown onto the street/outside'],
                  ['5', 'Thrown into gutter'],
                  ['6', 'Thrown onto compound'],
                  ['7', 'Other']
                ].map(([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        {onBack && (
          <Button type="button" onClick={onBack} variant="outline">
           Previous
          </Button>
        )}
          <Button className='bg-blue-600 hover:bg-blue-700 flex items-center space-x-2' type="submit"><span>Continue</span>
          <ChevronRight className="h-4 w-4" /></Button>
      </div>
    </form>
  );
}

export type { HousingConditionsContinuedData as FourteenthFormData };
export const defaultValues = {} as const;