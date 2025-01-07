"use client"

import React, { useState, useCallback, useMemo } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

// Import all form components
import FirstForm, { FirstFormData, defaultValues as firstFormDefaults } from "@/components/form/First";
import SecondForm, { HouseholdRosterData, defaultValues as secondFormDefaults } from "@/components/form/Second";
import ThirdForm, { ThirdFormData, defaultValues as thirdFormDefaults } from "@/components/form/Third";
import FourthForm, { FourthFormData, defaultValues as fourthFormDefaults } from "@/components/form/Fourth";

type FormStatus = 'idle' | 'submitting' | 'submitted' | 'error';
type FormPage = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;

interface CompleteFormData {
  form1: FirstFormData;
  form2: HouseholdRosterData;
  form3: ThirdFormData;
  form4: FourthFormData;
  [key: string]: any;
}

interface FormConfig {
  component: React.ComponentType<any>;
  defaultValues: any;
  title: string;
  description: string;
}

export default function FormPage() {
  // Form configuration object
  const formConfigs = useMemo<Record<number, FormConfig>>(() => ({
    1: {
      component: FirstForm,
      defaultValues: firstFormDefaults,
      title: "Location Information",
      description: "Enter the location and contact details"
    },
    2: {
      component: SecondForm,
      defaultValues: secondFormDefaults,
      title: "Household Roster",
      description: "Enter household member details"
    },
    3: {
      component: ThirdForm,
      defaultValues: thirdFormDefaults,
      title: "Household Characteristics",
      description: "Enter household characteristics"
    },
    4: {
      component: FourthForm,
      defaultValues: fourthFormDefaults,
      title: "Household Demographics",
      description: "Enter demographic information for household members"
    },
  }), []);

  // Form state management
  const [formData, setFormData] = useState<CompleteFormData>(() => {
    return Object.entries(formConfigs).reduce((acc, [key, config]) => ({
      ...acc,
      [`form${key}`]: config.defaultValues
    }), {} as CompleteFormData);
  });
  
  const [currentPage, setCurrentPage] = useState<FormPage>(1);
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const totalPages = Object.keys(formConfigs).length;

  const resetForm = useCallback(() => {
    setFormData(Object.entries(formConfigs).reduce((acc, [key, config]) => ({
      ...acc,
      [`form${key}`]: config.defaultValues
    }), {} as CompleteFormData));
    setCurrentPage(1);
    setFormStatus('idle');
    setErrorMessage('');
  }, [formConfigs]);

  const handleNext = useCallback(async (data: any) => {
    try {
      setFormStatus('submitting');

      setFormData(prev => ({
        ...prev,
        [`form${currentPage}`]: data
      }));

      if (currentPage === totalPages) {
        await submitForm();
        setFormStatus('submitted');
      } else {
        setCurrentPage(prev => (prev + 1) as FormPage);
        setFormStatus('idle');
      }
    } catch (error) {
      setFormStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  }, [currentPage, totalPages]);

  const handleBack = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(prev => (prev - 1) as FormPage);
      setFormStatus('idle');
    }
  }, [currentPage]);

  const submitForm = async () => {
    try {
      const completeData = Object.entries(formData).reduce((acc, [key, value]) => ({
        ...acc,
        ...value
      }), {});

      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', completeData);
      
    } catch (error) {
      throw new Error('Failed to submit form. Please try again.');
    }
  };

  const renderForm = useCallback(() => {
    const config = formConfigs[currentPage];
    if (!config) {
      console.error(`No configuration found for page ${currentPage}`);
      return null;
    }

    const FormComponent = config.component;
    return (
      <div className="space-y-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">{config.title}</h2>
          <p className="text-gray-600">{config.description}</p>
        </div>
        <FormComponent
          initialData={formData[`form${currentPage}`]}
          onBack={currentPage > 1 ? handleBack : undefined}
          onNext={handleNext}
        />
      </div>
    );
  }, [currentPage, formData, handleBack, handleNext, formConfigs]);

  if (formStatus === 'submitted') {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <Alert className="bg-green-50">
          <AlertDescription>
            Form submitted successfully!
          </AlertDescription>
        </Alert>
        <Button onClick={resetForm} className="mt-4">
          Start New Form
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {formStatus === 'error' && (
        <Alert variant="destructive">
          <AlertDescription>
            {errorMessage || 'There was an error submitting the form. Please try again.'}
          </AlertDescription>
        </Alert>
      )}

      <div className="min-h-[600px]">
        {renderForm()}
      </div>

      <div className="flex flex-col items-center space-y-2">
        <div className="flex justify-center space-x-2 w-full max-w-md">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <div
              key={page}
              className={`h-2 w-full rounded-full transition-colors duration-200 ${
                page === currentPage 
                  ? 'bg-blue-600' 
                  : page < currentPage 
                    ? 'bg-blue-300'
                    : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600">
          Step {currentPage} of {totalPages}
        </span>
      </div>

      {formStatus === 'submitting' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg flex items-center space-x-2">
            <Loader2 className="animate-spin" />
            <span>Submitting...</span>
          </div>
        </div>
      )}
    </div>
  );
}