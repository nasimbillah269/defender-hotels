@extends(adminTheme().'layouts.app')
@section('title')
<title>{{websiteTitle('Dashboard')}}</title>
@endsection

@php
    $perm = json_decode(Auth::user()->permission->permission, true) ?? [];
    $hour = (int) now()->format('G');
    $greeting = $hour < 12 ? 'Good morning' : ($hour < 17 ? 'Good afternoon' : 'Good evening');
    $typeMeta = [
        1 => ['label' => 'News & Events', 'icon' => 'fa-newspaper',   'route' => 'admin.postsAction',  'tone' => 'violet'],
        4 => ['label' => 'Blog',          'icon' => 'fa-pen-nib',     'route' => 'admin.blogsAction',  'tone' => 'rose'],
        5 => ['label' => 'Video',         'icon' => 'fa-circle-play', 'route' => 'admin.videosAction', 'tone' => 'teal'],
    ];
    $statusTone = ['pending' => 'amber', 'active' => 'green', 'cancelled' => 'red'];
    $nameParts = preg_split('/\s+/', trim(Auth::user()->name ?? 'Admin'));
    $firstName = (in_array(strtolower(rtrim($nameParts[0], '.')), ['md', 'mohammad', 'mohammed', 'muhammad']) && isset($nameParts[1])) ? $nameParts[1] : $nameParts[0];
@endphp

@section('contents')
<div class="content-body adm-dash">

    {{-- ===== Welcome banner ===== --}}
    <section class="adm-hero">
        <div class="adm-hero__text">
            <p class="adm-hero__eyebrow">{{ now()->format('l, d F Y') }}</p>
            <h1>{{ $greeting }}, {{ $firstName }} 👋</h1>
            <p>Here's what's happening with <strong>{{ general()->title }}</strong> today.</p>
        </div>
        <div class="adm-hero__actions">
            @isset($perm['posts']['add'])
            <a href="{{ route('admin.postsAction', ['create']) }}" class="adm-btn adm-btn--light"><i class="fas fa-plus"></i> News &amp; Event</a>
            <a href="{{ route('admin.blogsAction', ['create']) }}" class="adm-btn adm-btn--light"><i class="fas fa-plus"></i> Blog</a>
            <a href="{{ route('admin.videosAction', ['create']) }}" class="adm-btn adm-btn--light"><i class="fas fa-plus"></i> Video</a>
            @endisset
            <a href="{{ route('index') }}" target="_blank" class="adm-btn adm-btn--ghost"><i class="fas fa-arrow-up-right-from-square"></i> Visit Website</a>
        </div>
    </section>

    {{-- ===== KPI cards ===== --}}
    <section class="adm-kpis">
        <a href="{{ route('admin.bookings') }}" class="adm-kpi adm-kpi--violet">
            <span class="adm-kpi__icon"><i class="fas fa-inbox"></i></span>
            <span class="adm-kpi__body">
                <span class="adm-kpi__label">Total Inquiries</span>
                <span class="adm-kpi__value">{{ number_format($inquiries['total']) }}</span>
                <span class="adm-kpi__meta"><b>+{{ $inquiries['thisMonth'] }}</b> this month</span>
            </span>
        </a>
        <a href="{{ route('admin.bookings', ['status' => 'pending']) }}" class="adm-kpi adm-kpi--amber">
            <span class="adm-kpi__icon"><i class="fas fa-hourglass-half"></i></span>
            <span class="adm-kpi__body">
                <span class="adm-kpi__label">Pending Follow-ups</span>
                <span class="adm-kpi__value">{{ number_format($inquiries['pending']) }}</span>
                <span class="adm-kpi__meta">waiting for a response</span>
            </span>
        </a>
        <a href="{{ route('admin.posts') }}" class="adm-kpi adm-kpi--rose">
            <span class="adm-kpi__icon"><i class="fas fa-layer-group"></i></span>
            <span class="adm-kpi__body">
                <span class="adm-kpi__label">Published Content</span>
                <span class="adm-kpi__value">{{ number_format($stats['news'] + $stats['blogs'] + $stats['videos']) }}</span>
                <span class="adm-kpi__meta">{{ $stats['news'] }} news · {{ $stats['blogs'] }} blogs · {{ $stats['videos'] }} videos</span>
            </span>
        </a>
        <a href="{{ route('admin.usersCustomer') }}" class="adm-kpi adm-kpi--teal">
            <span class="adm-kpi__icon"><i class="fas fa-user-group"></i></span>
            <span class="adm-kpi__body">
                <span class="adm-kpi__label">Customers</span>
                <span class="adm-kpi__value">{{ number_format($stats['customers']) }}</span>
                <span class="adm-kpi__meta">active accounts</span>
            </span>
        </a>
    </section>

    {{-- ===== Chart + breakdown ===== --}}
    <section class="adm-grid adm-grid--2-1">
        <div class="adm-card">
            <div class="adm-card__head">
                <div>
                    <h3>Inquiries Overview</h3>
                    <p>Investment applications vs. consultation requests — last 6 months</p>
                </div>
                <a href="{{ route('admin.bookings') }}" class="adm-link">View all <i class="fas fa-arrow-right"></i></a>
            </div>
            <div id="admInquiryChart" class="adm-chart"></div>
        </div>

        <div class="adm-card">
            <div class="adm-card__head">
                <div>
                    <h3>Inquiry Mix</h3>
                    <p>All time</p>
                </div>
            </div>
            <div id="admMixChart" class="adm-chart adm-chart--donut"></div>
            <ul class="adm-legend">
                <li><span class="dot dot--violet"></span> Investment Applications <b>{{ $inquiries['applications'] }}</b></li>
                <li><span class="dot dot--teal"></span> Consultation Requests <b>{{ $inquiries['consultations'] }}</b></li>
            </ul>
        </div>
    </section>

    {{-- ===== Recent inquiries + recent content ===== --}}
    <section class="adm-grid adm-grid--3-2">
        <div class="adm-card adm-card--flush">
            <div class="adm-card__head">
                <div>
                    <h3>Recent Inquiries</h3>
                    <p>Latest applications &amp; consultation requests</p>
                </div>
                <a href="{{ route('admin.bookings') }}" class="adm-link">Booking list <i class="fas fa-arrow-right"></i></a>
            </div>
            <div class="table-responsive">
                <table class="adm-table">
                    <thead>
                        <tr><th>Name</th><th>Contact</th><th>Date</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                        @forelse($recentInquiries as $b)
                        <tr>
                            <td>
                                <div class="adm-person">
                                    <span class="adm-avatar">{{ Str::upper(Str::substr(trim($b->name ?: '?'), 0, 1)) }}</span>
                                    <span>
                                        <span class="adm-strong">{{ Str::limit($b->name ?: 'Unknown', 22) }}</span>
                                        <small>{{ $b->type == 0 ? 'Investment application' : 'Consultation request' }}</small>
                                    </span>
                                </div>
                            </td>
                            <td class="adm-muted">{{ $b->mobile ?: $b->email }}</td>
                            <td class="adm-muted">{{ $b->created_at?->format('d M Y') }}</td>
                            <td><span class="adm-pill adm-pill--{{ $statusTone[$b->status] ?? 'gray' }}">{{ ucfirst($b->status) }}</span></td>
                        </tr>
                        @empty
                        <tr><td colspan="4" class="adm-empty">No inquiries yet.</td></tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>

        <div class="adm-card">
            <div class="adm-card__head">
                <div>
                    <h3>Recent Content</h3>
                    <p>News, blogs &amp; videos</p>
                </div>
            </div>
            <ul class="adm-feed">
                @forelse($recentContent as $c)
                @php $m = $typeMeta[$c->type]; @endphp
                <li>
                    <span class="adm-feed__icon adm-tone--{{ $m['tone'] }}"><i class="fas {{ $m['icon'] }}"></i></span>
                    <span class="adm-feed__body">
                        <a href="{{ route($m['route'], ['edit', $c->id]) }}">{{ Str::limit($c->name ?: 'Untitled', 46) }}</a>
                        <small>{{ $m['label'] }} · {{ $c->created_at?->diffForHumans() }}</small>
                    </span>
                    <span class="adm-pill adm-pill--{{ $c->status == 'active' ? 'green' : 'gray' }}">{{ $c->status == 'active' ? 'Live' : 'Draft' }}</span>
                </li>
                @empty
                <li class="adm-empty">No content yet.</li>
                @endforelse
            </ul>
        </div>
    </section>

    {{-- ===== Website content shortcuts ===== --}}
    <section class="adm-card">
        <div class="adm-card__head">
            <div>
                <h3>Website Content</h3>
                <p>Jump straight to any section</p>
            </div>
        </div>
        <div class="adm-shortcuts">
            <a href="{{ route('admin.posts') }}"><i class="fas fa-newspaper adm-tone--violet"></i><b>{{ $stats['news'] }}</b><span>News &amp; Events</span></a>
            <a href="{{ route('admin.blogs') }}"><i class="fas fa-pen-nib adm-tone--rose"></i><b>{{ $stats['blogs'] }}</b><span>Blogs</span></a>
            <a href="{{ route('admin.videos') }}"><i class="fas fa-circle-play adm-tone--teal"></i><b>{{ $stats['videos'] }}</b><span>Videos</span></a>
            <a href="{{ route('admin.galleries') }}"><i class="fas fa-images adm-tone--amber"></i><b>{{ $stats['galleries'] }}</b><span>Galleries</span></a>
            <a href="{{ route('admin.pages') }}"><i class="fas fa-copy adm-tone--blue"></i><b>{{ $stats['pages'] }}</b><span>Pages</span></a>
            <a href="{{ route('admin.services') }}"><i class="fas fa-bell-concierge adm-tone--green"></i><b>{{ $stats['services'] }}</b><span>Services</span></a>
        </div>
    </section>

</div>
@endsection

@push('js')
<script>
    (function () {
        if (typeof ApexCharts === 'undefined') return;
        var font = 'Plus Jakarta Sans, Inter, sans-serif';
        var chart = @json($chart);

        new ApexCharts(document.querySelector('#admInquiryChart'), {
            chart: { type: 'area', height: 300, fontFamily: font, toolbar: { show: false }, zoom: { enabled: false } },
            series: [
                { name: 'Investment Applications', data: chart.applications },
                { name: 'Consultation Requests',   data: chart.consultations }
            ],
            colors: ['#7b2a8f', '#14b8a6'],
            stroke: { curve: 'smooth', width: 3 },
            fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: .35, opacityTo: .02, stops: [0, 95] } },
            dataLabels: { enabled: false },
            markers: { size: 4, strokeWidth: 2, strokeColors: '#fff', hover: { size: 6 } },
            grid: { borderColor: '#eef0f5', strokeDashArray: 4, padding: { left: 8, right: 8 } },
            xaxis: { categories: chart.labels, axisBorder: { show: false }, axisTicks: { show: false },
                     labels: { style: { colors: '#8a8fa3', fontSize: '12px' } } },
            yaxis: { min: 0, forceNiceScale: true, labels: { style: { colors: '#8a8fa3', fontSize: '12px' },
                     formatter: function (v) { return Math.round(v); } } },
            legend: { position: 'top', horizontalAlign: 'right', fontSize: '13px', markers: { radius: 12 } },
            tooltip: { theme: 'light' }
        }).render();

        new ApexCharts(document.querySelector('#admMixChart'), {
            chart: { type: 'donut', height: 240, fontFamily: font },
            series: [{{ (int) $inquiries['applications'] }}, {{ (int) $inquiries['consultations'] }}],
            labels: ['Investment Applications', 'Consultation Requests'],
            colors: ['#7b2a8f', '#14b8a6'],
            legend: { show: false },
            dataLabels: { enabled: false },
            stroke: { width: 4, colors: ['#fff'] },
            plotOptions: { pie: { donut: { size: '74%', labels: { show: true,
                total: { show: true, label: 'Total', color: '#8a8fa3', fontSize: '13px',
                         formatter: function () { return {{ (int) $inquiries['total'] }}; } },
                value: { fontSize: '26px', fontWeight: 800, color: '#1b1b22' } } } } }
        }).render();
    })();
</script>
@endpush
