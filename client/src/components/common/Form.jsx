import { Button } from '../ui/button.jsx'
import { Input } from '../ui/input'
import { Label } from '../ui/label.jsx'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select'
import { Textarea } from '../ui/textarea.jsx'

const CommonForm = ({
    formControls = [],
    formData,
    setFormData,
    onSubmit,
    buttonText,
    placeholder,
    isBtnDisabled,
}) => {
    // Single handler for all state changes
    const handleChange = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const renderInputsByComponentType = (controlItem) => {
        const value = formData[controlItem.name] ?? ''

        switch (controlItem.componentType) {
            case 'input':
                return (
                    <Input
                        name={controlItem.name}
                        placeholder={placeholder}
                        id={controlItem.name}
                        type={controlItem.type || 'text'}
                        value={value}
                        onChange={(e) =>
                            handleChange(controlItem.name, e.target.value)
                        }
                    />
                )

            case 'select':
                return (
                    <Select
                        value={value}
                        onValueChange={(val) =>
                            handleChange(controlItem.name, val)
                        }
                    >
                        <SelectTrigger className='w-full'>
                            <SelectValue
                                placeholder={controlItem.placeholder}
                            />
                        </SelectTrigger>
                        <SelectContent>
                            {controlItem.options?.length > 0
                                ? controlItem.options.map((optionItem) => (
                                      <SelectItem
                                          key={optionItem.id}
                                          value={
                                              optionItem.id
                                          } /* Fixed: changed SelectValue to value */
                                      >
                                          {optionItem.label}
                                      </SelectItem>
                                  ))
                                : null}
                        </SelectContent>
                    </Select>
                )

            case 'textarea':
                return (
                    <Textarea
                        name={controlItem.name}
                        placeholder={controlItem.placeholder}
                        id={controlItem.name}
                        value={value}
                        onChange={(e) =>
                            handleChange(controlItem.name, e.target.value)
                        }
                    />
                )

            default:
                return (
                    <Input
                        name={controlItem.name}
                        placeholder={controlItem.placeholder}
                        id={controlItem.name}
                        type={controlItem.type || 'text'}
                        value={value} /* Fixed: added missing value prop */
                        onChange={(e) =>
                            handleChange(controlItem.name, e.target.value)
                        }
                    />
                )
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div className='flex flex-col gap-3'>
                {formControls.map((controlItem) => (
                    <div key={controlItem.name} className='grid w-full gap-1.5'>
                        <Label htmlFor={controlItem.name} className='mb-1'>
                            {controlItem.label}
                        </Label>
                        {renderInputsByComponentType(controlItem)}
                    </div>
                ))}
            </div>
            <Button
                className='mt-2 w-full'
                type='submit'
                disabled={isBtnDisabled}
            >
                {buttonText || 'Submit'}
            </Button>
        </form>
    )
}

export default CommonForm
