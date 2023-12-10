@component('mail::message')

Hello <br><h4>{{$data['name']}}</h4>,

<div class="box">
    <p style="margin: 10px 0px;"> Thank you for registering at Northwestern Mindanao State College of Science and Technology, To access use this credintials   
    </p>
        
        {{-- <br> --}}
        Username: {{ $data['email'] }}
        Password: {{ $data['password'] }}
        {{-- <br> --}}
    {{-- <p style="font-size: 13px;"> --}}
        Please keep this information secure and do not share your password with anyone. If you have any questions or need assistance, feel free to contact our support team at  or visit our data center.
    {{-- </p>     --}}
        {{-- Please keep this information secure and do not share your password with anyone. If you have any questions or need assistance, feel free to contact our support team at  or visit our data center --}}
</div>

Thanks,<br>
Northwestern Mindanao State College of Science and Technology
@endcomponent