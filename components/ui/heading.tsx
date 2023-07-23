interface HeadingProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center space-x-4'>
        <div className='flex items-center justify-center w-12 h-12 bg-gray-100 rounded-md'>
          {icon}
        </div>
        <div>
          <h2 className='text-2xl font-semibold text-gray-800'>{title}</h2>
          <p className='text-sm text-muted-foreground'>{description}</p>
        </div>
      </div>
    </div>
  );
};
