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
            'general' => general(),
            // Ownership categories for the global "Free Consultation" form.
            // Pages that pass their own servicesList override this value.
            'servicesList' => fn () => Post::where('type', 3)
                ->where('status', 'active')
                ->whereNotNull('name')
                ->get(['id', 'name']),
        ];
    }
}
