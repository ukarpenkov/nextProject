export function Loader() {
    return (
        <div
            style={{
                position: 'relative',
                width: '60px',
                height: '60px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '50%',
            }}
        >
            {[...Array(8)].map((_, index) => (
                <span
                    key={index}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: [80, 70, 60, 50, 40, 30, 20, 10][index] + 'px',
                        width: '35px',
                        height: '7px',
                        background: '#ffff',
                        animation: 'dominos 1s ease infinite',
                        animationDelay: [0.125, 0.3, 0.425, 0.54, 0.665, 0.79, 0.915, 0][index] + 's',
                        boxShadow: '2px 2px 3px 0px black',
                    }}
                />
            ))}
            <style>
                {`
            @keyframes dominos {
              50% { opacity: 0.7; }
              75% { transform: rotate(90deg); }
              80% { opacity: 1; }
            }
          `}
            </style>
        </div>
    )
}
