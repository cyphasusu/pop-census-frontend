"use client";

import FirstForm, { defaultValues as firstFormDefaults, FirstFormData } from "@/components/form/First";
import  SecondForm, { defaultValues as secondFormDefaults, HouseholdRosterData }from "@/components/form/Second";
import React, { useState, useCallback } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

type FormStatus = 'idle' | 'submitting' | 'submitted' | 'error';

interface CompleteFormData {
  firstForm: FirstFormData;
  secondForm: HouseholdRosterData;
}

export default function FormPage() {
  // Initialize with default values for both forms
  const [formData, setFormData] = useState<CompleteFormData>({
    firstForm: firstFormDefaults,
    secondForm: secondFormDefaults
  });
  
  const [currentPage, setCurrentPage] = useState(1);
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const resetForm = useCallback(() => {
    setFormData({
      firstForm: firstFormDefaults,
      secondForm: secondFormDefaults
    });
    setCurrentPage(1);
    setFormStatus('idle');
    setErrorMessage('');
  }, []);

  const handleNext = useCallback(async (data: FirstFormData | HouseholdRosterData) => {
    try {
      setFormStatus('submitting');

      setFormData(prev => {
        if (currentPage === 1) {
          return {
            ...prev,
            firstForm: data as FirstFormData
          };
        } else {
          return {
            ...prev,
            secondForm: data as HouseholdRosterData
          };
        }
      });

      if (currentPage === 4) {
        // Handle final submission here
        await submitForm();
        setFormStatus('submitted');
      } else {
        setCurrentPage(prev => prev + 1);
        setFormStatus('idle');
      }
    } catch (error) {
      setFormStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
    }
  }, [currentPage]);

  const handleBack = useCallback(() => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  }, []);

  // Function to handle final form submission
  const submitForm = async () => {
    // access complete form
    const completeData = {
      ...formData.firstForm,
      householdRoster: formData.secondForm
    };
    
    // Implement your submission logic here
    console.log('Submitting complete form data:', completeData);
    
    // api to post
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {formStatus === 'error' && (
        <Alert variant="destructive">
          <AlertDescription>
            {errorMessage || 'There was an error submitting the form. Please try again.'}
          </AlertDescription>
        </Alert>
      )}
      
      {formStatus === 'submitted' && (
        <Alert>
          <AlertDescription>
            Form submitted successfully!
          </AlertDescription>
        </Alert>
      )}

      {/* Form Pages */}
      <div className="min-h-[600px]">
        {currentPage === 1 && (
          <FirstForm
            initialData={formData.firstForm}
            onBack={currentPage > 1 ? handleBack : undefined}
            onNext={handleNext}
          />
        )}
        {currentPage === 2 && (
          <SecondForm
            initialData={formData.secondForm}
            onBack={handleBack}
            onNext={handleNext}
          />
        )}
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center space-x-2 mt-4">
        {[1, 2].map((page) => (
          <div
            key={page}
            className={`h-2 w-8 rounded-full transition-colors duration-200 ${
              page === currentPage 
                ? 'bg-blue-600' 
                : page < currentPage 
                  ? 'bg-blue-300'
                  : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}