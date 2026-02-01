'use client';

import { useEffect } from 'react';

export function ConsoleMessage() {
    useEffect(() => {
        const styles = {
            header: 'font-size: 20px; font-weight: bold; color: #0066FF;',
            subtext: 'font-size: 14px; color: #888;',
            link: 'font-size: 14px; color: #0066FF;',
        };

        console.log(
            `%c
     ██╗ █████╗ ██╗   ██╗
     ██║██╔══██╗╚██╗ ██╔╝
     ██║███████║ ╚████╔╝ 
██   ██║██╔══██║  ╚██╔╝  
╚█████╔╝██║  ██║   ██║   
 ╚════╝ ╚═╝  ╚═╝   ╚═╝   
            `,
            'color: #0066FF; font-family: monospace;'
        );

        console.log('%c Hey there, fellow developer!', styles.header);
        console.log('%c Thanks for checking out my code.', styles.subtext);
        console.log('%c Open to Summer 2026 internships', styles.subtext);
        console.log('%c jayvpandya22@gmail.com', styles.link);
        console.log('%c github.com/jprocode', styles.link);
        console.log('%c\n Psst... try the Konami code!', 'font-size: 12px; color: #22c55e;');
    }, []);

    return null;
}
