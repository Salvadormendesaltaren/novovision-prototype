import ArchetypeCard from './ArchetypeCard';

export default function ArchetypeGrid({ archetypes }) {
  return (
    <div className="archetype-grid">
      {archetypes.map((item, index) => (
        <ArchetypeCard item={item} index={index} key={item.number} />
      ))}
    </div>
  );
}
