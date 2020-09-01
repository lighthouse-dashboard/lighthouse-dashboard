export default { title: 'Compponents / Nav Bar' };

export const component = () => `
<nav class="nav-bar">
    <div class="nav-bar--title-wrapper">
        <a href="/"
                class="u-reset nav-bar--title">
            Lighthouse
        </a>
    </div>

    <ul class="nav-bar--list">
        <li class="nav-bar--list-item">
            <a class="nav-bar--list-item-link u-reset"
                    href="/app/dashboard">Dashboard</a>
        </li>

        <li class="nav-bar--list-item">
            <a class="nav-bar--list-item-link u-reset"
                    href="/app/projects">Projects</a>
        </li>

        <li class="nav-bar--list-item">
            <a class="nav-bar--list-item-link u-reset"
                    href="/app/syste">System</a>
        </li>
    </ul>
</nav>
`;
