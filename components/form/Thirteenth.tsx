"use client"

import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface HousingConditionsData {
  dwellingType: string;
  outerWall: string;
  floor: string;
  roof: string;
  tenureArrangement: string;
  ownershipType: string;
  totalRooms: number;
  sleepingRooms: number;
  sharedRoom: 'YES' | 'NO';
  sharedHouseholds?: number;
  lighting: string;
  waterSupply: string;
  otherSpecify?: {
    dwelling?: string;
    wall?: string;
    floor?: string;
    roof?: string;
    tenure?: string;
    ownership?: string;
    lighting?: string;
    water?: string;
  };
}

export default function HousingConditionsForm({ initialData, onBack, onNext }: {
  initialData?: HousingConditionsData;
  onBack?: () => void;
  onNext: (data: HousingConditionsData) => void;
}) {
  const { register, handleSubmit, watch, setValue } = useForm<HousingConditionsData>({
    defaultValues: initialData || {
      sharedRoom: 'NO'
    }
  });

  const sharedRoom = watch('sharedRoom');

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label>Type of Dwelling</Label>
            <Select onValueChange={v => setValue('dwellingType', v)} defaultValue={initialData?.dwellingType}>
              <SelectTrigger>
                <SelectValue placeholder="Select dwelling type" />
              </SelectTrigger>
              <SelectContent>
                {[
                  { value: '01', label: 'Separate house' },
                  { value: '02', label: 'Semi-detached house' },
                  { value: '03', label: 'Flat/Apartment' },
                  { value: '04', label: 'Compound house (rooms)' },
                  { value: '05', label: 'Huts/Buildings (same compound)' },
                  { value: '06', label: 'Huts/Buildings (different compounds)' },
                  { value: '07', label: 'Tent' },
                  { value: '08', label: 'Improvised home' },
                  { value: '09', label: 'Living quarters attached to office/shop' },
                  { value: '10', label: 'Uncompleted building' },
                  { value: '11', label: 'Other' }
                ].map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {watch('dwellingType') === '11' && (
              <Input {...register('otherSpecify.dwelling')} placeholder="Specify other" className="mt-2" />
            )}
          </div>

          <div>
            <Label>Outer Wall Material</Label>
            <Select onValueChange={v => setValue('outerWall', v)} defaultValue={initialData?.outerWall}>
              <SelectTrigger>
                <SelectValue placeholder="Select wall material" />
              </SelectTrigger>
              <SelectContent>
                {[
                  { value: '01', label: 'Mud bricks/earth' },
                  { value: '02', label: 'Wood' },
                  { value: '03', label: 'Metal sheet/slate/asbestos' },
                  { value: '04', label: 'Stone' },
                  { value: '05', label: 'Burnt bricks' },
                  { value: '06', label: 'Cement blocks/concrete' },
                  { value: '07', label: 'Landcrete' },
                  { value: '08', label: 'Bamboo' },
                  { value: '09', label: 'Palm leaves/Thatch' },
                  { value: '10', label: 'Other' }
                ].map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Floor Material</Label>
            <Select onValueChange={v => setValue('floor', v)} defaultValue={initialData?.floor}>
              <SelectTrigger>
                <SelectValue placeholder="Select floor material" />
              </SelectTrigger>
              <SelectContent>
                {[
                  { value: '1', label: 'Earth/Mud' },
                  { value: '2', label: 'Cement/Concrete' },
                  { value: '3', label: 'Stone' },
                  { value: '4', label: 'Burnt bricks' },
                  { value: '5', label: 'Wood' },
                  { value: '6', label: 'Vinyl tiles' },
                  { value: '7', label: 'Ceramic/Porcelain/Marble tiles' },
                  { value: '8', label: 'Terrazzo/Terrazzo tiles' },
                  { value: '9', label: 'Other' }
                ].map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Roof Material</Label>
            <Select onValueChange={v => setValue('roof', v)} defaultValue={initialData?.roof}>
              <SelectTrigger>
                <SelectValue placeholder="Select roof material" />
              </SelectTrigger>
              <SelectContent>
                {[
                  { value: '1', label: 'Mud/Mud bricks/Earth' },
                  { value: '2', label: 'Wood' },
                  { value: '3', label: 'Metal sheet' },
                  { value: '4', label: 'Slate/Asbestos' },
                  { value: '5', label: 'Cement/Concrete' },
                  { value: '6', label: 'Roofing Tiles' },
                  { value: '7', label: 'Bamboo' },
                  { value: '8', label: 'Thatch/Palm leaves/Raffia' },
                  { value: '9', label: 'Other' }
                ].map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Number of Rooms</Label>
            <Input type="number" {...register('totalRooms')} min={0} />
          </div>

          <div>
            <Label>Number of Sleeping Rooms</Label>
            <Input type="number" {...register('sleepingRooms')} min={0} />
          </div>

          <div>
            <Label>Shared Sleeping Room?</Label>
            <RadioGroup defaultValue={initialData?.sharedRoom || 'NO'} onValueChange={v => setValue('sharedRoom', v as 'YES' | 'NO')}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="YES" id="yes" />
                <Label htmlFor="yes">Yes</Label>
                <RadioGroupItem value="NO" id="no" />
                <Label htmlFor="no">No</Label>
              </div>
            </RadioGroup>
          </div>

          {sharedRoom === 'YES' && (
            <div>
              <Label>Number of Households Sharing</Label>
              <Input type="number" {...register('sharedHouseholds')} min={1} />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        {onBack && (
          <Button type="button" onClick={onBack} variant="outline">
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

export type { HousingConditionsData as ThirteenthFormData };
export const defaultValues = {
  sharedRoom: 'NO'
} as const;