<?php

namespace App\Http\Middleware;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'headerMenu' => menuItem('Header Menus'),
            'footerMenu2' => menuItem('Footer Two'),
            'footerMenu3' => menuItem('Footer Three'),
            'footerMenu4' => menuItem('Footer Four'),
            // Public site settings only – never send credentials to the browser
            // (every Inertia page embeds its props in the HTML source).
            'general' => general()->makeHidden([
                'mail_driver', 'mail_host', 'mail_port', 'mail_username', 'mail_password',
                'mail_encryption', 'mail_from_name', 'mail_from_address', 'mail_status',
                'sms_username', 'sms_password', 'sms_senderid', 'sms_url_masking',
                'sms_url_nonmasking', 'sms_type', 'sms_status',
                'fb_app_id', 'fb_app_secret', 'fb_app_redirect_url',
                'tw_app_id', 'tw_app_secret', 'tw_app_redirect_url',
                'google_client_id', 'google_client_secret', 'google_client_redirect_url',
                'admin_mails', 'admin_numbers', 'balance',
                'register_mail_user', 'register_mail_author', 'forget_password_mail_user', 'register_verify_mail_user',
                'register_sms_user', 'register_sms_author', 'forget_password_sms_user', 'register_verify_sms_user',
            ]),
            // Ownership categories for the global "Free Consultation" form.
            // Pages that pass their own servicesList override this value.
            'servicesList' => fn () => Post::where('type', 3)
                ->where('status', 'active')
                ->whereNotNull('name')
                ->get(['id', 'name']),
        ];
    }
}
