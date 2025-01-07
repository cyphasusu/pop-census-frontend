"use client"

import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface AgriculturalFormProps {
  initialData?: any;
  onBack?: () => void;
  onNext: (data: any) => void;
}

interface ActivityData {
  cropFarming: 'YES' | 'NO';
  treeGrowing: 'YES' | 'NO';
  livestockRearing: 'YES' | 'NO';
  fishFarming: 'YES' | 'NO';
  membersCount: {
    male: number;
    female: number;
  };
  crops: Array<{
    type: string;
    cropCode: string;
    farmSize: string;
    measurementUnit: '1' | '2' | '3' | '4' | '5';
    croppingType: '1' | '2' | '3';
  }>;
  livestock: Array<{
    type: string;
    code: string;
    number: number;
  }>;
}

export default function AgriculturalForm({ initialData, onBack, onNext }: AgriculturalFormProps) {
  const { register, handleSubmit, watch, setValue } = useForm<ActivityData>({
    defaultValues: initialData || {
      cropFarming: 'NO',
      treeGrowing: 'NO',
      livestockRearing: 'NO',
      fishFarming: 'NO',
      membersCount: { male: 0, female: 0 },
      crops: Array(6).fill({ type: '', cropCode: '', farmSize: '', measurementUnit: '1', croppingType: '1' }),
      livestock: Array(4).fill({ type: '', code: '', number: 0 })
    }
  });

  const hasAgriculturalActivity = watch(['cropFarming', 'treeGrowing', 'livestockRearing', 'fishFarming'])
    .some(value => value === 'YES');

  const onSubmit = (data: ActivityData) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Does any member cultivate crops?</Label>
            <RadioGroup
              defaultValue={initialData?.cropFarming || 'NO'}
              onValueChange={v => setValue('cropFarming', v as 'YES' | 'NO')}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="YES" id="cropYes" />
                <Label htmlFor="cropYes">YES</Label>
                <RadioGroupItem value="NO" id="cropNo" />
                <Label htmlFor="cropNo">NO</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Similar radio groups for tree, livestock, fish */}
        </div>

        {hasAgriculturalActivity && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Male members involved</Label>
                <Input
                  type="number"
                  {...register('membersCount.male')}
                />
              </div>
              <div>
                <Label>Female members involved</Label>
                <Input
                  type="number"
                  {...register('membersCount.female')}
                />
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type of Crop/Tree</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Farm Size</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Cropping Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array(6).fill(0).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Input {...register(`crops.${index}.type`)} />
                    </TableCell>
                    <TableCell>
                      <Input {...register(`crops.${index}.cropCode`)} />
                    </TableCell>
                    <TableCell>
                      <Input {...register(`crops.${index}.farmSize`)} />
                    </TableCell>
                    <TableCell>
                      <select {...register(`crops.${index}.measurementUnit`)}>
                        <option value="1">Acre</option>
                        <option value="2">Hectare</option>
                        <option value="3">Pole</option>
                        <option value="4">Rope</option>
                        <option value="5">Plot</option>
                      </select>
                    </TableCell>
                    <TableCell>
                      <select {...register(`crops.${index}.croppingType`)}>
                        <option value="1">Mixed Cropping</option>
                        <option value="2">Inter Cropping</option>
                        <option value="3">Mono Cropping</option>
                      </select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type of Livestock/Fishery</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Number</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array(4).fill(0).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Input {...register(`livestock.${index}.type`)} />
                    </TableCell>
                    <TableCell>
                      <Input {...register(`livestock.${index}.code`)} />
                    </TableCell>
                    <TableCell>
                      <Input 
                        type="number"
                        {...register(`livestock.${index}.number`)} 
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </div>

      <div className="flex justify-between">
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

export type { ActivityData as TwelfthFormData };
export const defaultValues = {
  cropFarming: 'NO',
  treeGrowing: 'NO',
  livestockRearing: 'NO',
  fishFarming: 'NO',
  membersCount: { male: 0, female: 0 },
  crops: Array(6).fill({ type: '', cropCode: '', farmSize: '', measurementUnit: '1', croppingType: '1' }),
  livestock: Array(4).fill({ type: '', code: '', number: 0 })
} as const;