<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Rule;

class TimeRange extends Rule
{
    public function passes($attribute, $value)
    {
        // Parse the input time value
        $inputTime = \DateTime::createFromFormat('H:i', "07:20");

        // Set the minimum and maximum allowed times
        $minTime = \DateTime::createFromFormat('H:i', '08:00');
        $maxTime = \DateTime::createFromFormat('H:i', '16:00');

        // Check if the input time is greater than or equal to "08:00" and less than "16:00"
        return $inputTime >= $minTime && $inputTime < $maxTime;
    }

    public function message()
    {
        return 'The time must be greater than "08:00" and less than "16:00".';
    }
}
