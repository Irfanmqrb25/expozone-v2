"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Modal from "./Modal";
import Heading from "../Heading";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import UploadthingInput from "../input/UploadthingInput";

import axios from "axios";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import useCreateStoreModal from "@/hooks/useCreateStoreModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

enum STEPS {
  PROFILE_STORE = 0,
  INFO_STORE = 1,
}

const CreateStoreModal = () => {
  const router = useRouter();
  const createStoreModal = useCreateStoreModal();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.PROFILE_STORE);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      image: "",
      email: "",
      country: "",
      city: "",
      address: "",
      description: "",
    },
  });

  const imageWatch = watch("image");

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step === STEPS.PROFILE_STORE) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post("/api/store", data)
      .then(() => {
        router.refresh();
        reset();
        setStep(STEPS.PROFILE_STORE);
        createStoreModal.onClose();
        toast.success("Toko berhasil dibuat!");
      })
      .catch((e) => {
        toast.error(e.response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO_STORE) {
      return "Simpan";
    }
    return "Selanjutnya";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.PROFILE_STORE) {
      return undefined;
    }
    return "Kembali";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Atur profil toko anda!" subtitle="Langkah 1 dari 2" />
      <div className="flex flex-col items-center justify-center w-full gap-10">
        <div>
          <UploadthingInput
            onChange={(value) => setValue("image", value)}
            value={imageWatch}
          />
        </div>
        <Input
          id="name"
          disabled={isLoading}
          {...register("name", { required: "Nama toko harus diisi" })}
          placeholder="Name your store"
          className={cn(
            "text-center",
            errors["name"] ? "focus-visible:ring-red-500 border-red-300" : ""
          )}
        />
      </div>
    </div>
  );

  if (step === STEPS.INFO_STORE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Atur informasi toko!" subtitle="Step 2 of 2" />
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <span>Email</span>
            <Input
              id="email"
              disabled={isLoading}
              {...register("email", { required: "Email toko harus diisi" })}
              className={cn(
                errors["email"]
                  ? "focus-visible:ring-red-500 border-red-300"
                  : ""
              )}
            />
          </div>
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="w-full">
              <label>Negara</label>
              <Input
                id="country"
                disabled={isLoading}
                {...register("country", {
                  required: "Lokasi negara toko harus diisi",
                })}
                className={cn(
                  errors["address"]
                    ? "focus-visible:ring-red-500 border-red-300"
                    : ""
                )}
              />
            </div>
            <div className="w-full">
              <label>Kota</label>
              <Input
                id="city"
                disabled={isLoading}
                {...register("city", {
                  required: "Lokasi kota toko harus diisi",
                })}
                className={cn(
                  errors["address"]
                    ? "focus-visible:ring-red-500 border-red-300"
                    : ""
                )}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span>Alamat</span>
            <Input
              id="address"
              disabled={isLoading}
              {...register("address", {
                required: "Alamat lengkap toko harus diisi",
              })}
              className={cn(
                errors["address"]
                  ? "focus-visible:ring-red-500 border-red-300"
                  : ""
              )}
            />
          </div>
          <div className="flex flex-col gap-1">
            <span>Deskripsi</span>
            <Textarea
              id="description"
              disabled={isLoading}
              {...register("description", {
                required: "Deskripsi toko harus diisi",
              })}
              className={cn(
                errors["description"]
                  ? "focus-visible:ring-red-500 border-red-300"
                  : ""
              )}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Modal
      title="Buat Toko Anda"
      isOpen={createStoreModal.isOpen}
      onClose={createStoreModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.PROFILE_STORE ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default CreateStoreModal;
