<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title inertia>{{ config('app.name', websiteTitle()) }}</title>

        <link rel="apple-touch-icon" href="{{asset(general()->favicon())}}"/>
        <link rel="shortcut icon" type="image/x-icon" href="{{asset(general()->favicon())}}"/>
        @if(isset($page['props']['meta']))
            @if($meta=$page['props']['meta'])
            <meta name="title" content="{{ $meta['title'] ?? config('app.name') }}">
            <meta name="description" content="{{ $meta['description'] ?? 'Default description here.' }}">
            <meta name="keywords" content="{{ $meta['keywords'] ?? '' }}">
            <link rel="canonical" href="{{ $meta['url'] ?? url()->current() }}">

            <!-- Open Graph (for social sharing) -->
            <meta property="og:title" content="{{ $meta['title'] ?? config('app.name') }}">
            <meta property="og:description" content="{{ $meta['description'] ?? 'Default description here.' }}">
            <meta property="og:image" content="{{ $meta['image'] ?? asset('default-image.jpg') }}">
            <meta property="og:url" content="{{ $meta['url'] ?? url()->current() }}">

            <script type="application/ld+json">
                {
                    "@context": "https://schema.org/",
                    "@type": "Hotel",
                    "name": "{{ general()->meta_title }}",
                    "address": {
                        "@type": "PostalAddress",
                        "postalCode": "1213",
                        "streetAddress": "Suvastu Jahanara Square, House No.-39, Road-11",
                        "addressCountry": "BD",
                        "addressLocality": "Banani, Dhaka"
                    },
                    "image": "{{ asset(general()->favicon()) }}",
                    "telephone": "{{ general()->mobile }}",
                    "url": "{{ route('index') }}",
                    "description": "{{ general()->meta_description }}"
                }
            </script>

            @if(isset($meta['structuredData']))
            <script type="application/ld+json">
                {!! json_encode($meta['structuredData'], JSON_UNESCAPED_SLASHES|JSON_PRETTY_PRINT) !!}
            </script>
            @endif
            
            @endif
        @endif
        
        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
        <!--Start of Tawk.to Script-->
        <script type="text/javascript">
        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/672f5ae24304e3196adfa055/1ic8fm1gs';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
        })();
        </script>
        <!--End of Tawk.to Script-->
    </body>
</html>
