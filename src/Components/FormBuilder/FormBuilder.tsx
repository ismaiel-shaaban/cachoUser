import React, { Fragment, HTMLAttributes } from "react";
import { useCallback } from "react";
import { Control, FieldValues, FormState } from "react-hook-form";
import FormInput, { FormInputProps } from "../FormInput/FormInput";

type FormBuilderProps = {
  formConfigArray: Array<FormInputProps | Array<FormInputProps>>;
  control: Control<any>;
  formState: FormState<FieldValues>;
  setFocus?: (name: any) => void;
  trigger?: any;
  setValue?: any;
};

function FormBuilder(props: FormBuilderProps) {
  const { formConfigArray, control, setFocus, formState, trigger, setValue } =
    props;

  const onNextInput = useCallback(
    (index: number, configArray: any) => {
      if (configArray[index + 1]) {
        if (
          setFocus &&
          configArray[index + 1].type !== "custom" &&
          configArray[index + 1].type !== "select" &&
          configArray[index + 1].type !== "autocomplete" &&
          configArray[index + 1].type !== "date"
        ) {
          if (setFocus) {
            setFocus(configArray[index + 1].name);
          }
        }
      }
    },
    [setFocus]
  );

  return (
    <Fragment>
      {formConfigArray.map((item, index) =>
        Array.isArray(item) ? (
          <Fragment key={index}>
            <div className={`flex`}>
              {item.map((innerItem, innerIndex) => (
                <Fragment key={innerItem.name}>
                  <div style={{ flex: 1 }}>
                    <FormInput
                      {...innerItem}
                      control={control}
                      textInputProps={{
                        ...innerItem.textInputProps,
                        onSubmitEditing:
                          innerItem.textInputProps?.onSubmitEditing ??
                          (() => {
                            onNextInput(
                              innerIndex === item.length - 1
                                ? index
                                : innerIndex,
                              innerIndex === item.length - 1
                                ? formConfigArray
                                : item
                            );
                          }),
                        returnKeyType:
                          index !== formConfigArray.length - 1
                            ? "next"
                            : "done",
                      }}
                      trigger={trigger}
                      setValue={setValue}
                    />
                  </div>
                  {innerIndex !== item.length - 1 && (
                    <div className="dNone" style={{ width: 15 }} />
                  )}
                </Fragment>
              ))}
            </div>
            {index !== formConfigArray.length - 1 && (
              <div className="dNone" style={{ height: 15 }} />
            )}
          </Fragment>
        ) : (
          <Fragment key={item.name}>
            <FormInput
              {...item}
              control={control}
              textInputProps={{
                ...item.textInputProps,
                onSubmitEditing:
                  item.textInputProps?.onSubmitEditing ??
                  (() => {
                    onNextInput(
                      Array.isArray(formConfigArray[index + 1]) ? -1 : index,
                      Array.isArray(formConfigArray[index + 1])
                        ? formConfigArray[index + 1]
                        : formConfigArray
                    );
                  }),
                returnKeyType:
                  index !== formConfigArray.length - 1 ? "next" : "done",
              }}
              trigger={trigger}
              setValue={setValue}
            />
            {index !== formConfigArray.length - 1 && (
              <div className="dNone" style={{ height: 15 }} />
            )}
          </Fragment>
        )
      )}
      <div className="dNone" style={{ height: 15, display: "none" }} />
    </Fragment>
  );
}

export default FormBuilder;
